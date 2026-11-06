var $ = function(s) { return document.querySelector(s) };

var H_CH = 'Todos los días, según cartelera de funciones';
var H_IN = 'Según programación (consulte la página del cine)';
var cine = function(n, p, u, l, k, h) { return { n: n, p: p, u: u, h: h || H_CH, l: l, k: k } };
var CP = 'https://www.cinepolis.co.cr', NV = 'https://www.novacinemas.cr', CM = 'https://www.cinemark.cr', CC = 'https://www.citicinemas.com';
var multi = [
    { n: 'Cinépolis Costa Rica', s: [
        cine('Lincoln Plaza (Moravia)', 'San José', 'Centro comercial Lincoln Plaza, San Vicente, Moravia', CP, 'Cinépolis'),
        cine('Terramall (Tres Ríos)', 'Cartago', 'Centro comercial Terramall, Tres Ríos, La Unión', CP, 'Cinépolis'),
        cine('Paseo Metrópoli (Cartago)', 'Cartago', 'Centro comercial Paseo Metrópoli, Cartago centro', CP, 'Cinépolis'),
        cine('Paseo de las Flores (Heredia)', 'Heredia', 'Centro comercial Paseo de las Flores, Heredia', CP, 'Cinépolis'),
        cine('Mall Multicentro (Desamparados)', 'San José', 'Mall Multicentro Desamparados, Desamparados', CP, 'Cinépolis'),
        cine('Terrazas Lindora (Santa Ana)', 'San José', 'Terrazas Lindora, Pozos, Santa Ana', CP, 'Cinépolis')
    ] },
    { n: 'Nova Cinemas', s: [
        cine('Avenida Escazú (San José)', 'San José', 'Centro comercial Avenida Escazú, San Rafael de Escazú', NV, 'Nova'),
        cine('Ciudad del Este (Curridabat)', 'San José', 'Centro comercial Ciudad del Este, Curridabat', NV, 'Nova'),
        cine('Plaza Real (Alajuela)', 'Alajuela', 'Centro comercial Plaza Real, Alajuela', NV, 'Nova'),
        cine('Plaza Moín (Limón)', 'Limón', 'Centro comercial Plaza Moín, Moín, Limón', NV, 'Nova'),
        cine('Garden Plaza (Tamarindo)', 'Guanacaste', 'Garden Plaza, Tamarindo, Santa Cruz', NV, 'Nova')
    ] },
    { n: 'Cinemark Costa Rica', s: [
        cine('Multiplaza Escazú (San José)', 'San José', 'Centro comercial Multiplaza Escazú, Guachipelín, Escazú', CM, 'Cinemark'),
        cine('Multiplaza Curridabat / del Este (San José)', 'San José', 'Centro comercial Multiplaza del Este, Curridabat', CM, 'Cinemark')
    ] },
    { n: 'CitiCinemas', s: [
        cine('Plaza Grecia (Alajuela)', 'Alajuela', 'Centro comercial Plaza Grecia, Grecia', CC, 'CitiCinemas'),
        cine('Jacó Walk (Puntarenas)', 'Puntarenas', 'Centro comercial Jacó Walk, Jacó, Garabito', CC, 'CitiCinemas')
    ] }
];
var single = [
    cine('Studio Cinemas', 'San José', 'City Place, Santa Ana (complejo premium)', 'https://www.studiocinemas.cr', null)
];
var indep = [
    cine('Cine Magaly', 'San José', 'Barrio Escalante, San José (cine cultural)', 'https://www.cinemagaly.com', null, H_IN),
    cine('Sala Garbo', 'San José', 'Paseo Colón, San José (cine histórico e independiente)', 'https://www.salagarbo.com', null, H_IN)
];
var POS = [{ "t": "The Hunger Games: Sunrise on the Reaping", "s": "img/posters/01-hunger-games.jpg" }, { "t": "Godzilla Minus Zero", "s": "img/posters/02-godzilla-minus-zero.jpg" }, { "t": "Hechizo: Bienvenidos a Hexe", "s": "img/posters/03-hechizo.jpg" }, { "t": "The Cat in the Hat", "s": "img/posters/04-cat-in-the-hat.jpg" }, { "t": "Sacrificio: Los elegidos", "s": "img/posters/05-sacrificio.jpg" }];
var img = function(i) { var p = POS[i % POS.length]; return '<img src="' + p.s + '" alt="' + p.t + '" title="' + p.t + '" loading="lazy">' };
var posters = function(n, m) { var s = ''; for (var i = 0; i < n; i++) s += '<div class="po">' + img(i + (m || 0)) + '</div>'; return '<div class="posters">' + s + '</div>' };
var info = function(o) { return '<div class="r"><b>'+t('Provincia')+'</b><span>' + t(o.p) + '</span></div><div class="r"><b>'+t('Ubicación')+'</b><span>' + t(o.u) + '</span></div><div class="r"><b>'+t('Horario del cine')+'</b><span>' + t(o.h) + '</span></div>' };
var card = function(o) { return '<article class="cc"><div class="ci"><span class="bd">' + o.p + '</span>'+t('Foto del cine')+'</div><div class="cb"><h3>' + o.n + '</h3>' + info(o) + '<div class="lab" style="margin:16px 0 4px">'+t('Cartelera')+'</div>' + posters(4, 1) + '<a class="btn" href="' + o.l + '">'+t('Ir a la página del cine')+'</a></div></article>' };
var ci = 0,
    bi = 0;

function drawMulti() {
    var c = multi[ci],
        b = c.s[bi];
    $('#chains').innerHTML = '<div class="lab">'+t('Cine')+'</div>' + multi.map(function(m, i) { return '<button class="chain' + (i == ci ? ' on' : '') + '" data-c="' + i + '">' + m.n + '</button>' }).join('');
    $('#detail').innerHTML = '<div class="lab">'+t('Elegir sucursal')+'</div><div class="pills">' + c.s.map(function(s, i) { return '<button class="pill' + (i == bi ? ' on' : '') + '" data-b="' + i + '">' + s.n + '</button>' }).join('') + '</div><h3 style="font-size:28px;margin-bottom:8px">' + c.n + ' · ' + b.n + '</h3>' + info(b) + '<a class="btn" href="' + b.l + '" style="margin:20px 0 26px">'+t('Ir a la página del cine')+'</a><div class="lab">'+t('Cartelera actualizada')+'</div>' + posters(5, bi)
}
document.addEventListener('click', function(e) { var t = e.target.closest('[data-c],[data-b]'); if (!t) return; if (t.dataset.c !== undefined) { ci = +t.dataset.c;
        bi = 0 } else bi = +t.dataset.b;
    drawMulti() });
$('#g-single').innerHTML = single.map(card).join('');
$('#g-indep').innerHTML = indep.map(card).join('');
$('#pops').innerHTML = [1, 2, 3, 4, 5].map(function(i) { return '<div class="pop"><div class="num">' + i + '</div><div class="po">' + img(i - 1) + '</div></div>' }).join('');
var qs = [];

function drawQ() { $('#quotes').innerHTML = qs.map(function(q) { return '<div class="q"><div class="st">★★★★★</div><p></p><small></small></div>' }).join(''); var ps = document.querySelectorAll('#quotes .q');
    qs.forEach(function(q, i) { ps[i].querySelector('p').textContent = t(q[1]);
        ps[i].querySelector('small').textContent = q[0] }) }
qs = [
    ['María Fernández', 'Muy útil para encontrar mi cine más cercano y ver el horario sin vueltas.'],
    ['Andrés Mora', 'Me encantó que estén todas las sucursales de cada cadena en un solo lugar.'],
    ['Daniela Rojas', 'Por fin una página que incluye los cines independientes como Magaly y Garbo.']
];
drawQ();
$('#cform').addEventListener('submit', function(e) { e.preventDefault();
    qs.unshift([$('#cn').value, $('#ct').value]);
    drawQ();
    e.target.reset() });
$('#mform').addEventListener('submit', function(e) { e.preventDefault();
    $('#mb').textContent = t('Mensaje enviado');
    e.target.reset() });
var views = ['inicio', 'comerciales', 'varias-sucursales', 'una-sucursal', 'independientes'],
    anchors = ['populares', 'comentarios', 'contacto'];

function route() {
    var h = location.hash.slice(1) || 'inicio',
        a = anchors.indexOf(h) > -1,
        v = views.indexOf(h) > -1 ? h : (a ? ($('.pg.on') ? $('.pg.on').id.slice(2) : 'inicio') : 'inicio');
    document.querySelectorAll('.pg').forEach(function(s) { s.classList.toggle('on', s.id == 'p-' + v) });
    $('#mob').classList.remove('open');
    if (v == 'varias-sucursales') drawMulti();
    if (a) $('#' + h).scrollIntoView();
    else window.scrollTo(0, 0)
}
window.addEventListener('hashchange', route);
route();
$('#bg').onclick = function() { $('#mob').classList.toggle('open') };
$('#th').onclick = function() { var r = document.documentElement,
        d = r.dataset.theme ? r.dataset.theme == 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
    r.dataset.theme = d ? 'light' : 'dark' };


// ---------- Idioma ES / EN ----------
var currentLang = 'es';
try { currentLang = localStorage.getItem('lang') || 'es' } catch (e) {}
var EN = {
  'Cines de Costa Rica · deleFOCO':'Cinemas of Costa Rica · deleFOCO',
  'Cines':'Cinemas','Populares':'Popular','Comentarios':'Comments','Contacto':'Contact',
  '/ Comerciales':'/ Commercial','/ Varias sucursales':'/ Several branches','/ Una sola sucursal':'/ Single branch','/ Independientes':'/ Independent',
  'Inicio':'Home','Comerciales':'Commercial','Independientes':'Independent',
  'Cines de Costa Rica':'Cinemas of Costa Rica',
  'Encuentre su cine, su horario y su cartelera':'Find your cinema, its hours and its listings',
  'Elija el tipo de cine y llegue directo a su ubicación, horario y películas en cartelera.':'Choose the type of cinema and go straight to its location, hours and films now showing.',
  'Cines comerciales':'Commercial cinemas',
  'Cadenas con una o varias sucursales en todo el país.':'Chains with one or several branches across the country.',
  'Ver cines comerciales':'See commercial cinemas',
  'Cines independientes':'Independent cinemas',
  'Salas alternativas con programación propia.':'Alternative theaters with their own programming.',
  'Ver cines independientes':'See independent cinemas',
  '¿Qué tipo de cine comercial busca?':'What kind of commercial cinema are you looking for?',
  'Escoja si el cine tiene varias sucursales o una sola.':'Choose whether the cinema has several branches or just one.',
  'Con varias sucursales':'With several branches',
  'Elija el cine y luego la sucursal que le queda mejor.':'Pick the cinema, then the branch that suits you best.',
  'Ver cines':'See cinemas',
  'Con una sola sucursal':'With a single branch',
  'Cines comerciales con una única ubicación.':'Commercial cinemas with a single location.',
  'Cines con varias sucursales':'Cinemas with several branches',
  'Seleccione un cine y luego su sucursal.':'Select a cinema, then its branch.',
  'Varias sucursales':'Several branches','Una sola sucursal':'Single branch',
  'Cines con una sola sucursal':'Cinemas with a single branch',
  'Cada cine con su ubicación, horario y cartelera.':'Each cinema with its location, hours and listings.',
  'Espacios con programación propia y mucho carácter.':'Spaces with their own programming and plenty of character.',
  'Lo más visto':'Most watched','Películas populares en los cines':'Popular films in theaters',
  'Comunidad':'Community','Comentarios sobre la página':'Comments about the site',
  'Su nombre':'Your name','Deje su comentario':'Leave your comment','Publicar comentario':'Post comment',
  '¿Falta un cine o hay un dato por corregir?':'Is a cinema missing or is something wrong?',
  'Escríbanos y lo revisamos.':'Write to us and we will look into it.',
  'Nombre':'Name','Correo':'Email','Mensaje':'Message','Enviar mensaje':'Send message','Mensaje enviado':'Message sent',
  'deleFOCO · Cines de Costa Rica':'deleFOCO · Cinemas of Costa Rica',
  'Ir a la cartelera de deleFOCO':'Go to the deleFOCO listings',
  'Cambiar idioma':'Change language','Abrir menú':'Open menu','Principal':'Main',
  'Cambiar entre modo claro y oscuro':'Switch between light and dark mode',
  'Provincia':'Province','Ubicación':'Location','Horario del cine':'Cinema hours',
  'Foto del cine':'Cinema photo','Cartelera':'Now showing','Cartelera actualizada':'Updated listings',
  'Ir a la página del cine':'Go to the cinema page','Cine':'Cinema','Elegir sucursal':'Choose branch',
  'Todos los días, según cartelera de funciones':'Every day, according to the showtime schedule',
  'Según programación (consulte la página del cine)':'According to programming (see the cinema page)',
  'Centro comercial Lincoln Plaza, San Vicente, Moravia':'Lincoln Plaza shopping center, San Vicente, Moravia',
  'Centro comercial Terramall, Tres Ríos, La Unión':'Terramall shopping center, Tres Ríos, La Unión',
  'Centro comercial Paseo Metrópoli, Cartago centro':'Paseo Metrópoli shopping center, downtown Cartago',
  'Centro comercial Paseo de las Flores, Heredia':'Paseo de las Flores shopping center, Heredia',
  'Mall Multicentro Desamparados, Desamparados':'Mall Multicentro Desamparados, Desamparados',
  'Terrazas Lindora, Pozos, Santa Ana':'Terrazas Lindora, Pozos, Santa Ana',
  'Centro comercial Avenida Escazú, San Rafael de Escazú':'Avenida Escazú shopping center, San Rafael de Escazú',
  'Centro comercial Ciudad del Este, Curridabat':'Ciudad del Este shopping center, Curridabat',
  'Centro comercial Plaza Real, Alajuela':'Plaza Real shopping center, Alajuela',
  'Centro comercial Plaza Moín, Moín, Limón':'Plaza Moín shopping center, Moín, Limón',
  'Garden Plaza, Tamarindo, Santa Cruz':'Garden Plaza, Tamarindo, Santa Cruz',
  'Centro comercial Multiplaza Escazú, Guachipelín, Escazú':'Multiplaza Escazú shopping center, Guachipelín, Escazú',
  'Centro comercial Multiplaza del Este, Curridabat':'Multiplaza del Este shopping center, Curridabat',
  'Centro comercial Plaza Grecia, Grecia':'Plaza Grecia shopping center, Grecia',
  'Centro comercial Jacó Walk, Jacó, Garabito':'Jacó Walk shopping center, Jacó, Garabito',
  'City Place, Santa Ana (complejo premium)':'City Place, Santa Ana (premium complex)',
  'Barrio Escalante, San José (cine cultural)':'Barrio Escalante, San José (cultural cinema)',
  'Paseo Colón, San José (cine histórico e independiente)':'Paseo Colón, San José (historic independent cinema)',
  'Heredia':'Heredia','Cartago':'Cartago','Alajuela':'Alajuela','Limón':'Limón','Guanacaste':'Guanacaste','Puntarenas':'Puntarenas','San José':'San José',
  'Muy útil para encontrar mi cine más cercano y ver el horario sin vueltas.':'Very useful for finding my nearest cinema and checking showtimes quickly.',
  'Me encantó que estén todas las sucursales de cada cadena en un solo lugar.':'I loved that every branch of each chain is in one place.',
  'Por fin una página que incluye los cines independientes como Magaly y Garbo.':'Finally a site that includes independent cinemas like Magaly and Garbo.'
};
// Los nombres de sucursales (p. ej. "Lincoln Plaza (Moravia)") son nombres propios y no se traducen.
function t(s) { return currentLang === 'en' && EN[s] !== undefined ? EN[s] : s }

var origText = new Map(), ATTRS = ['placeholder', 'aria-label', 'title'];
function applyStatic() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while (n = w.nextNode()) {
        var p = n.parentNode;
        if (p.closest('script,.lang-btn,#chains,#detail,#g-single,#g-indep,#quotes')) continue;
        if (!origText.has(n)) origText.set(n, n.nodeValue);
        var o = origText.get(n), k = o.trim();
        if (EN[k] !== undefined) n.nodeValue = currentLang === 'en' ? o.replace(k, EN[k]) : o;
    }
    document.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function(el) {
        ATTRS.forEach(function(a) {
            if (!el.hasAttribute(a)) return;
            var key = 'es_' + a;
            if (!el.dataset[key]) el.dataset[key] = el.getAttribute(a);
            var es = el.dataset[key];
            el.setAttribute(a, currentLang === 'en' && EN[es] ? EN[es] : es);
        });
    });
    document.querySelectorAll('img[alt]').forEach(function(i) { i.title = i.alt });
    document.title = t('Cines de Costa Rica · deleFOCO');
    document.documentElement.lang = currentLang;
    document.querySelectorAll('.lang-btn').forEach(function(b) {
        var es = b.querySelector('.lang-es'), en = b.querySelector('.lang-en');
        if (es && en) { es.classList.toggle('active', currentLang == 'es'); en.classList.toggle('active', currentLang == 'en') }
    });
}
function setLang(l) {
    currentLang = l;
    try { localStorage.setItem('lang', l) } catch (e) {}
    applyStatic();
    drawMulti();
    $('#g-single').innerHTML = single.map(card).join('');
    $('#g-indep').innerHTML = indep.map(card).join('');
    drawQ();
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('.lang-btn')) return;
    setLang(currentLang == 'es' ? 'en' : 'es');
    $('#mob').classList.remove('open');
});
document.querySelectorAll('img[data-p]').forEach(function(m) { m.src = POS[+m.dataset.p].s });
$('#hero').addEventListener('mousemove', function(e) { var x = e.clientX / innerWidth - .5;
    document.querySelectorAll('.fl').forEach(function(f) { f.style.translate = (x * f.dataset.d) + 'px ' + (x * f.dataset.d / 2) + 'px' }) });
if (currentLang == 'en') setLang('en'); else applyStatic();
