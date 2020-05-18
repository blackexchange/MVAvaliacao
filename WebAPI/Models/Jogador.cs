using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Jogador
    {
        public int Id { get; set; }
        public string Nome { get; set; }

        public int EquipeId { get; set; }
        public Equipe Equipe { get; set; }

    }
}
