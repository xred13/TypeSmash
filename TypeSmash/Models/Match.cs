using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace TypeSmash.Models
{
    public class Match
    {
        [Key]
        public string ID { get; set; }

        public string MainWriter { get; set; }

        public string SecondWriter { get; set; }
    }
}
