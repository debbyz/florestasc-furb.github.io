(function(){
  // menu no celular
  var b=document.querySelector('.abrir-menu'),m=document.querySelector('.menu');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('mostrar');b.setAttribute('aria-expanded',o)})}
  // submenus abrem com clique (teclado e toque)
  document.querySelectorAll('.menu>li>button').forEach(function(bt){
    bt.addEventListener('click',function(){var li=bt.parentNode,o=!li.classList.contains('aberto');
      document.querySelectorAll('.menu>li.aberto').forEach(function(x){x.classList.remove('aberto');x.firstElementChild.setAttribute('aria-expanded','false')});
      if(o){li.classList.add('aberto');bt.setAttribute('aria-expanded','true')}});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.menu'))document.querySelectorAll('.menu>li.aberto').forEach(function(x){x.classList.remove('aberto')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')document.querySelectorAll('.menu>li.aberto').forEach(function(x){x.classList.remove('aberto')})});

  // busca em todo o site (índice em busca.js)
  function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
  document.querySelectorAll('[data-busca]').forEach(function(inp){
    var out=document.getElementById(inp.getAttribute('data-busca'));
    var raiz=inp.getAttribute('data-raiz')||'';
    inp.addEventListener('input',function(){
      var q=norm(inp.value.trim());out.innerHTML='';
      if(q.length<2||!window.INDICE)return;
      var termos=q.split(/\s+/),res=[];
      window.INDICE.forEach(function(it){var t=norm(it.t),x=norm(it.x),s=0;
        for(var i=0;i<termos.length;i++){if(t.indexOf(termos[i])>=0)s+=5;else if(x.indexOf(termos[i])>=0)s+=1;else{s=0;break}}
        if(it.d)s+=1; if(s>0)res.push([s,it])});
      res.sort(function(a,b){return b[0]-a[0]});
      res.slice(0,8).forEach(function(r){var it=r[1],a=document.createElement('a');
        a.href=/^https?:/.test(it.u)?it.u:raiz+it.u; if(/^https?:/.test(it.u)){a.target='_blank';a.rel='noopener'}
        a.textContent=it.t;var sm=document.createElement('small');sm.textContent=it.s;a.appendChild(sm);out.appendChild(a)});
      if(!res.length){var p=document.createElement('p');p.className='nota';p.textContent='Nada encontrado. Tente outra palavra ou escreva para florestasc@furb.br.';out.appendChild(p)}
    });
  });

  // filtros do portal de dados
  var fs=document.querySelectorAll('.filtros button');
  fs.forEach(function(f){f.addEventListener('click',function(){
    fs.forEach(function(x){x.setAttribute('aria-pressed','false')});f.setAttribute('aria-pressed','true');
    var c=f.getAttribute('data-f');
    document.querySelectorAll('[data-cat]').forEach(function(el){el.hidden=!(c==='todos'||el.getAttribute('data-cat').split(' ').indexOf(c)>=0)});
    document.querySelectorAll('[data-bloco]').forEach(function(bl){bl.hidden=!bl.querySelector('[data-cat]:not([hidden])')});
  })});
})();
