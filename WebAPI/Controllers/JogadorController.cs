using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JogadorController : ControllerBase
    {
        private readonly TorneioContext _context;

        public JogadorController(TorneioContext context)
        {
            _context = context;
        }

        // GET: api/Jogador
        [HttpGet]
        public async Task<ActionResult<Jogador[]>> GetJogadores()
        {
            IQueryable<Jogador> query = _context.Jogadores
                .Include(h => h.Equipe);
            query = query.AsNoTracking().OrderBy(h => h.Id);
            
            return await query.ToArrayAsync();
        }

        // GET: api/Jogador/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jogador>> GetJogador(int id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);

            if (jogador == null)
            {
                return NotFound();
            }

            return jogador;
        }

        // PUT: api/Jogador/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJogador(int id, Jogador jogador)
        {
            if (id != jogador.Id)
            {
                return BadRequest();
            }

            _context.Entry(jogador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JogadorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Jogador
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Jogador>> PostJogador(Jogador jogador)
        {
            _context.Jogadores.Add(jogador);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetJogador", new { id = jogador.Id }, jogador);
        }

        // DELETE: api/Jogador/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Jogador>> DeleteJogador(int id)
        {
            var jogador = await _context.Jogadores.FindAsync(id);
            if (jogador == null)
            {
                return NotFound();
            }

            _context.Jogadores.Remove(jogador);
            await _context.SaveChangesAsync();

            return jogador;
        }

        private bool JogadorExists(int id)
        {
            return _context.Jogadores.Any(e => e.Id == id);
        }
    }
}
