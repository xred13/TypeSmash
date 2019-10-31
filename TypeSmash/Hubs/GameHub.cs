using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace TypeSmash.Hubs
{
    public class GameHub : Hub
    {
        public static ConcurrentQueue<string> playerConnectionIdQueue = new ConcurrentQueue<string>();

        public bool RandomBoolean()
        {
            Random rand = new Random();
            return rand.NextDouble() >= 0.5;
        }

        public string[] GetPlayerRoles() // returns "Writer" and "Catcher" in positions 0 and 1 of an array of strings of size 2
        {
            string[] playerRoles = new string[2];

            if (RandomBoolean())
            {
                playerRoles[0] = "Writer";
                playerRoles[1] = "Catcher";
            }
            else
            {
                playerRoles[0] = "Catcher";
                playerRoles[1] = "Writer";
            }

            return playerRoles;
        }

        public async Task CreateGroupSendGroupIdAndRoles()
        {
            string firstPlayerInQueueConnectionId;

            if(playerConnectionIdQueue.TryDequeue(out firstPlayerInQueueConnectionId))
            {
                // we use this connection's id as the group's id
                string groupId = Context.ConnectionId;

                await Groups.AddToGroupAsync(firstPlayerInQueueConnectionId, groupId);
                await Groups.AddToGroupAsync(Context.ConnectionId, groupId);

                string[] playerRoles = GetPlayerRoles();
                
                await Clients.Caller.SendAsync("setGroupIdCookieAndPlayerRole", groupId, playerRoles[0]);
                await Clients.OthersInGroup(groupId).SendAsync("setGroupIdCookieAndPlayerRole", groupId, playerRoles[1]);
            }
            else {  }
        }

        public async override Task OnConnectedAsync()
        {

            string thisPlayerConnectionId = Context.ConnectionId;

            if(playerConnectionIdQueue.Count == 0)
            {
                playerConnectionIdQueue.Enqueue(thisPlayerConnectionId);
            }
            else
            {
                await CreateGroupSendGroupIdAndRoles();
            }
        }

        public async void WriterInputSent(string groupId, string inputSent)
        {
            await Clients.OthersInGroup(groupId).SendAsync("receiveWriterInput", inputSent);
        }

        public async void CatcherKeyPressSent(string groupId, string keyPress)
        {
            await Clients.OthersInGroup(groupId).SendAsync("receiveCatcherKeyPress", keyPress);
        }
    }
}
