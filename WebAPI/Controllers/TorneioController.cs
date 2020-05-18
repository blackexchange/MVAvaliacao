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
    public class TorneioController : ControllerBase
    {
        private readonly TorneioContext _context;

        public TorneioController(TorneioContext context)
        {
            _context = context;
        }

        // GET: api/Torneio
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Torneio>>> GetTorneios()
        {
            return await _context.Torneios.ToListAsync();
        }

        // GET: api/Torneio/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Torneio>> GetTorneio(int id)
        {
            var torneio = await _context.Torneios.FindAsync(id);

            if (torneio == null)
            {
                return NotFound();
            }

            return torneio;
        }

        // PUT: api/Torneio/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTorneio(int id, Torneio torneio)
        {
            if (id != torneio.Id)
            {
                return BadRequest();
            }

            _context.Entry(torneio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TorneioExists(id))
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

        // POST: api/Torneio
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Torneio>> PostTorneio(Torneio torneio)
        {
            _context.Torneios.Add(torneio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTorneio", new { id = torneio.Id }, torneio);
        }

        // DELETE: api/Torneio/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Torneio>> DeleteTorneio(int id)
        {
            var torneio = await _context.Torneios.FindAsync(id);
            if (torneio == null)
            {
                return NotFound();
            }

            _context.Torneios.Remove(torneio);
            await _context.SaveChangesAsync();

            return torneio;
        }

        private bool TorneioExists(int id)
        {
            return _context.Torneios.Any(e => e.Id == id);
        }
    }
}
