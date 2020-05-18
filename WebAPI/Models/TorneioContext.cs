using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class TorneioContext : DbContext
    {
        public TorneioContext(DbContextOptions<TorneioContext> options) : base(options)
        {

        }

        public DbSet<Torneio> Torneios { get; set; }
        public DbSet<Jogador> Jogadores { get; set; }
        public DbSet<Equipe> Equipes { get; set; }
    }

}
