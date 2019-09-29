using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace TypeSmash.Hubs
{
    public class GamingHub : Hub
    {

        public static ConcurrentQueue<string> playersConnectionIdQueue = new ConcurrentQueue<string>();

        public bool AtLeastOnePlayerInQueue()
        {
            return playersConnectionIdQueue.Count > 0 ;
        }

        public Task SendPlayerFoundMessage(string groupID)
        {
            Console.WriteLine("GROUPID:" + groupID);
            return Clients.Group(groupID).SendAsync("playerFound", groupID);
        }

        public bool RandomBoolean()
        {
            Random random = new Random();

            if (random.Next(2) == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public void SendPlayerRoles(string groupID)
        {
            if(RandomBoolean())
            {
                Clients.OthersInGroup(groupID).SendAsync("playerRole","WRITER");
                Clients.Caller.SendAsync("playerRole", "CATCHER");
            }
            else
            {
                Clients.OthersInGroup(groupID).SendAsync("playerRole", "CATCHER");
                Clients.Caller.SendAsync("playerRole", "WRITER");
            }
        }

        public void SendNewWordToCatcher(string word, string groupId)
        {
            Clients.OthersInGroup(groupId).SendAsync("receiveNewWrittenWord", word);
        }

        public void ReceiveAndSendNewKeyPressKeyCodeToWriter(string keyCode, string groupId)
        {
            Clients.OthersInGroup(groupId).SendAsync("receiveCatchersNewKeyPressKeyCode", keyCode);
        }

        public async void CreateGroup()
        {
            string firstInQueueID;
            if (!playersConnectionIdQueue.TryDequeue(out firstInQueueID))
            {
                //Failed to retrieve it
            }
            else
            {
                // We use firstInQueueId string as the group's name
                string groupID = firstInQueueID;

                await Groups.AddToGroupAsync(Context.ConnectionId, groupID);
                await Groups.AddToGroupAsync(firstInQueueID, groupID);

                Console.WriteLine("-------------CREATED GROUPS!-----------");

                await SendPlayerFoundMessage(groupID);
                SendPlayerRoles(groupID);

            }
        }

        public void AddPlayerConnectionIDToQueue()
        {
            playersConnectionIdQueue.Enqueue(Context.ConnectionId);
        }

        public override Task OnConnectedAsync()
        {
            Console.WriteLine("PLAYER CONNECTED!!!");
            Console.WriteLine("conn id:" + Context.ConnectionId);

            

            if (AtLeastOnePlayerInQueue())
            {
                Console.WriteLine("More than one player!");
                CreateGroup();
            }
            else
            {
                Console.WriteLine("Else");
                AddPlayerConnectionIDToQueue();
            }

            return base.OnConnectedAsync();
        }

        public void RemovePlayerConnectionIdFromQueue()
        {
            playersConnectionIdQueue = new ConcurrentQueue<string>(playersConnectionIdQueue.Where(connectionId => connectionId != Context.ConnectionId));
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            RemovePlayerConnectionIdFromQueue();

            return base.OnDisconnectedAsync(exception);
        }

    }
}
