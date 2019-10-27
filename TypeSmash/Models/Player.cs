using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace TypeSmash.Models
{
    public class Player
    {
        [Key]
        public string ID { get; set; }
    }
}
