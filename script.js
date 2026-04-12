async function cargarDatos() {
    try {
        const respuesta = await fetch('universidades.json');
        const datos = await respuesta.json();
        renderizarUniversidades(datos);
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function renderizarUniversidades(unis) {
    const contenedor = document.getElementById('lista-universidades');
    contenedor.innerHTML = '';

    unis.forEach((uni, index) => {
        const idUni = `uni-${index}`;
        const div = document.createElement('div');
        
        div.className = "group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col";
        
        div.innerHTML = `
            <div class="p-8 flex-grow">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${uni.tipo === 'Pública' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}">
                        ${uni.tipo}
                    </span>
                </div>
                <h2 class="text-2xl font-black text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">${uni.nombre}</h2>
                <p class="text-slate-400 text-sm mt-2 flex items-center">📍 Chihuahua, México</p>
            </div>
            
            <button onclick="toggle('${idUni}')" class="w-full py-4 bg-slate-50 border-t border-slate-100 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all">
                Ver Carreras
            </button>

            <div id="${idUni}" class="hidden-content bg-white p-6 border-t border-slate-100">
                ${uni.categorias.map(cat => `
                    <div class="mb-4">
                        <h3 class="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">${cat.nombre}</h3>
                        <div class="flex flex-wrap gap-2">
                            ${cat.carreras.map(c => `<span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-medium border border-slate-200">${c}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        contenedor.appendChild(div);
    });
}

function toggle(id) {
    const el = document.getElementById(id);
    
    if (el.style.display === "block") {
        el.style.display = "none";
    } else {
        el.style.display = "block";
    }
}


function filtrar() {
    let input = document.getElementById('buscador').value.toLowerCase();
    let cards = document.getElementsByClassName('group');

    for (let i = 0; i < cards.length; i++) {
        let texto = cards[i].innerText.toLowerCase();
        if (texto.includes(input)) {
            cards[i].style.display = "flex";
        } else {
            cards[i].style.display = "none";
        }
    }
}

cargarDatos();