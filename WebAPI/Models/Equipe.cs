using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Equipe
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public List<Jogador> Jogadors { get; set; }
      

    }
}
