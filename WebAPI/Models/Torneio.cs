using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Torneio
    {
        public int Id { get; set; }
        public int EquipeAId { get; set; }
        public int EquipeBId { get; set; }
        public DateTime DtPartida { get; set; }

        public int PlacarA { get; set; }
        public int PlacarB { get; set; }
 


    }
}
