const http = require('http');
const HOST='localhost',PORT=1337,CATEGORY_ID=8,AUTHOR_ID=1;

async function login(){
  const d=JSON.stringify({email:"sebastiansandoval12371@gmail.com",password:"Juansebas0317?"});
  return new Promise((r,j)=>{
    const q=http.request({hostname:HOST,port:PORT,path:'/admin/login',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(d)}},s=>{let b='';s.on('data',c=>b+=c);s.on('end',()=>r(JSON.parse(b).data.token));});
    q.on('error',j);q.write(d);q.end();
  });
}

async function create(token,t,s,de,co){
  const b=JSON.stringify({title:t,slug:s,description:de,content:co,author:AUTHOR_ID,category:CATEGORY_ID,published_at:new Date().toISOString()});
  return new Promise((r,j)=>{
    const q=http.request({hostname:HOST,port:PORT,path:'/articles',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(b),'Authorization':`Bearer ${token}`}},s=>{let p='';s.on('data',c=>p+=c);s.on('end',()=>{console.log(`  ${s.statusCode===200?'✅':'❌'} ${t}`);r();});});
    q.on('error',j);q.write(b);q.end();
  });
}

async function main(){
  const token=await login();
  console.log('Creando artículos de Casos de Estudio (estilo periodístico)...\n');
  const arts=[
    {
title:"El Gol en Propia Puerta de la Antipiratería",
slug:"gol-propia-puerta-antipirateria",
description:"Los bloqueos masivos de direcciones IP para combatir la piratería deportiva reabrieron el debate sobre derechos digitales y libertades en internet.",
content:`# El Gol en Propia Puerta de la Antipiratería

**Los bloqueos masivos de direcciones IP impulsados para combatir la transmisión ilegal de eventos deportivos terminaron afectando servicios legítimos. El caso reabrió el debate global sobre los límites de la protección de derechos de autor en la era digital.**

---

## Lo esencial

- Organizaciones deportivas internacionales intensificaron la persecución de transmisiones ilegales.
- Los bloqueos por IP masivos terminaron afectando plataformas y servicios legales.
- Miles de usuarios reportaron restricciones a servicios sin relación con la piratería.
- El caso reactivó el debate entre propiedad intelectual y derechos digitales.

---

## ¿Qué ocurrió?

Durante los últimos años, las grandes ligas deportivas y organizaciones como la UEFA y la FIFA intensificaron su lucha contra la piratería de transmisiones en vivo. La estrategia principal: solicitar a los proveedores de internet el bloqueo masivo de direcciones IP asociadas a servidores que retransmiten contenido protegido sin autorización.

El problema es que muchas de esas direcciones IP son compartidas. Un mismo servidor puede alojar decenas o cientos de sitios web legítimos junto a uno que transmite contenido pirateado. Al bloquear la IP, todos los sitios alojados en ese servidor —incluyendo los legales— quedan fuera del alcance de los usuarios.

> **Dato clave:** En el Reino Unido, los bloqueos por IP para combatir la piratería deportiva aumentaron un 400% entre 2020 y 2024, según la Oficina de Propiedad Intelectual.

## Los actores involucrados

| Quién | Posición |
|-------|----------|
| Grandes ligas y organizaciones deportivas | Defienden la propiedad intelectual como fuente de ingresos |
| Proveedores de internet | Atrapados entre obligaciones legales y quejas de usuarios |
| Usuarios finales | Afectados por restricciones que no provocaron |
| Defensores de derechos digitales | Alertan sobre el riesgo de censura indirecta |
| Plataformas de streaming legales | Pierden usuarios frente a bloqueos mal direccionados |

## ¿Por qué importa?

El caso trasciende el mundo del deporte. Plantea preguntas incómodas:

- ¿Hasta dónde puede llegar la protección de la propiedad intelectual sin vulnerar otros derechos?
- ¿Quién responde cuando un bloqueo masivo afecta a inocentes?
- ¿Deben los jueces autorizar medidas que afectan a millones sin audiencia previa?

> **Impacto para Colombia:** En el país, donde el acceso a internet sigue siendo un desafío en zonas rurales, los bloqueos masivos podrían profundizar la brecha digital si no se diseñan con precisión quirúrgica.

## Lo que viene

Los tribunales europeos ya comenzaron a exigir que los bloqueos sean "proporcionados y específicos". La tendencia global apunta hacia medidas más quirúrgicas: bloqueo por DNS en lugar de IP, listas dinámicas actualizadas en tiempo real, y mayor participación de jueces independientes en la autorización de restricciones.

## Reflexión

La tecnología permite combatir la piratería con una eficiencia sin precedentes. Pero esa misma eficiencia puede convertirse en un arma de doble filo cuando las medidas no distinguen entre culpables e inocentes. El verdadero desafío no es técnico: es encontrar el equilibrio entre proteger la creatividad y preservar las libertades digitales.`
    },
    {
title:"La muerte de 'El Mencho': ¿Justicia soberana o presión del norte?",
slug:"muerte-el-mencho-presion-del-norte",
description:"Análisis de las implicaciones políticas y jurídicas de la eventual captura de uno de los narcotraficantes más buscados del continente.",
content:`# La muerte de "El Mencho": ¿Justicia soberana o presión del norte?

**Nemesio Oseguera Cervantes, líder del Cártel Jalisco Nueva Generación, es uno de los hombres más buscados del planeta. Cualquier operación para capturarlo —o eliminarlo— tendría repercusiones que van mucho más allá de la seguridad pública mexicana.**

---

## Línea de tiempo: la trayectoria de un capo

| Año | Evento |
|-----|--------|
| 2011 | El CJNG emerge como escisión del Cártel de Sinaloa |
| 2015 | "El Mencho" toma el control absoluto del cártel |
| 2017 | La DEA ofrece 10 millones de dólares por su captura |
| 2020 | El CJNG se expande a 28 de los 32 estados mexicanos |
| 2023 | México y EE.UU. intensifican operaciones de inteligencia conjuntas |

---

## ¿Qué está en juego?

**Para México:**
- La captura sería un triunfo de soberanía nacional. Una operación mexicana limpia fortalecería la legitimidad del gobierno.
- El problema: el CJNG tiene capacidad de retaliación violenta. La captura de Abigael González Valencia provocó una ola de ataques en Jalisco en 2020.

**Para Estados Unidos:**
- "El Mencho" encabeza la lista de los más buscados de la DEA. Su captura es una prioridad política en el contexto de la crisis del fentanilo.
- La presión diplomática es constante, pero una operación unilateral estadounidense en suelo mexicano sería un escándalo diplomático.

> **Lo esencial:** Cualquier acción contra "El Mencho" pondrá a prueba la relación bilateral México-EE.UU. y la capacidad del Estado mexicano para ejercer soberanía en temas de seguridad.

## Preguntas clave

**¿Debería México aceptar asistencia operativa de EE.UU.?**
Históricamente, la cooperación ha sido tensa. La captura de "El Chapo" Guzmán en 2016 involucró inteligencia estadounidense, pero la ejecución fue mexicana.

**¿Qué pasa después de la captura?**
La historia muestra que desmantelar un cártel no elimina el negocio. El Cártel de Sinaloa sobrevivió a la captura de "El Chapo". El CJNG probablemente se fragmentaría, generando nuevas violencias.

## Impacto regional

México no es el único país afectado. El CJNG opera en al menos 12 países, incluyendo Colombia, donde mantiene alianzas con grupos locales para el tráfico de cocaína y precursores químicos.

> **Impacto para Colombia:** Una eventual desestabilización del CJNG podría reconfigurar las rutas del narcotráfico en el Pacífico colombiano, afectando a departamentos como Nariño, Cauca y Valle del Cauca.

## Reflexión

La muerte o captura de "El Mencho" no resolverá el problema del narcotráfico. Pero sí pondrá a prueba principios fundamentales: la soberanía nacional frente a la presión internacional, la efectividad de la cooperación bilateral y la capacidad de los Estados para ofrecer seguridad sin sacrificar derechos.`
    },
    {
title:"Democracia y crisis energética: el conflicto Colombia-Ecuador",
slug:"conflicto-colombia-ecuador-energia",
description:"Las tensiones energéticas y comerciales entre Colombia y Ecuador muestran cómo las decisiones económicas pueden influir en las relaciones internacionales.",
content:`# Democracia y crisis energética: el conflicto Colombia-Ecuador

**Las relaciones entre dos países vecinos suelen darse por sentadas hasta que un recurso estratégico —en este caso, la energía— pone a prueba los cimientos de la cooperación bilateral.**

---

## ¿Qué sucedió?

Colombia y Ecuador comparten una frontera de casi 600 kilómetros y una historia de integración económica que incluye acuerdos comerciales, intercambio energético y cooperación en seguridad. Sin embargo, en los últimos años, las tensiones en torno al suministro eléctrico y las medidas unilaterales de comercio generaron roces diplomáticos que recordaron lo frágil que puede ser la cooperación regional.

> **Dato clave:** Ecuador llegó a importar hasta el 10% de su energía desde Colombia en momentos de déficit, mientras que Colombia depende del mercado ecuatoriano para productos como atún, llantas y ciertos alimentos.

## Los actores involucrados

**Colombia:**
- Busca garantizar su seguridad energética interna antes de exportar.
- Las sequías asociadas al fenómeno de El Niño redujeron la capacidad hidroeléctrica.
- El gobierno enfrenta presiones internas para priorizar el consumo nacional.

**Ecuador:**
- Depende de las importaciones de electricidad colombiana durante crisis.
- Busca diversificar sus fuentes energéticas para reducir vulnerabilidad.
- Las restricciones comerciales colombianas afectan a exportadores ecuatorianos.

## ¿Por qué importa?

> **Impacto para la democracia:** Cuando un gobierno debe decidir entre garantizar energía barata para sus ciudadanos o cumplir compromisos internacionales, está tomando una decisión profundamente política. La transparencia en esas decisiones es lo que distingue a una democracia funcional de una que no lo es.

## Cifras destacadas

| Indicador | Colombia | Ecuador |
|-----------|----------|---------|
| Capacidad instalada hidroeléctrica | 70% del total | 80% del total |
| Comercio bilateral anual | 2.500 millones USD | — |
| Días de autonomía energética en crisis | 15-30 | 3-7 |

> **Lo esencial:** Ambos países comparten una vulnerabilidad común: una matriz energética excesivamente dependiente de la hidroelectricidad, lo que los expone a crisis climáticas simultáneas.

## Lo que viene

- Ecuador acelera proyectos solares y eólicos para reducir dependencia.
- Colombia explota nuevas fuentes térmicas y de gas.
- La CAN (Comunidad Andina) busca crear un mercado energético regional con reglas claras.
- El cambio climático hará que estas crisis sean más frecuentes.

## Reflexión

El caso Colombia-Ecuador demuestra que la cooperación regional no puede darse por sentada. Se construye todos los días con reglas claras, diálogo constante y, sobre todo, entendiendo que la energía no es solo un recurso técnico: es un asunto político que afecta la vida de millones.`
    },
    {
title:"La Guerra de los Chips: el pulso entre Irán e Israel que redefine la geopolítica de la inteligencia artificial",
slug:"guerra-de-los-chips-iran-israel",
description:"La tecnología se ha convertido en un nuevo escenario de competencia estratégica entre Estados, donde los semiconductores son el campo de batalla.",
content:`# La Guerra de los Chips: el pulso entre Irán e Israel que redefine la geopolítica de la inteligencia artificial

**Los semiconductores son el petróleo del siglo XXI. Quien controle su producción y distribución tendrá ventajas decisivas en inteligencia artificial, defensa y economía durante las próximas décadas. Oriente Medio es el nuevo campo de batalla tecnológico.**

---

## Claves para entender el caso

- Los chips avanzados son esenciales para IA, defensa, comunicaciones y computación.
- La producción está concentrada en pocos países: Taiwán (TSMC), Corea del Sur (Samsung) y Estados Unidos (Intel).
- Irán busca desarrollar su propia industria de semiconductores para evadir sanciones.
- Israel es un actor global en diseño de chips, con empresas como Mobileye y Tower Semiconductor.
- Estados Unidos y sus aliados restringen la exportación de tecnología de semiconductores a Irán.
- La guerra tecnológica entre potencias está reconfigurando alianzas estratégicas.

---

## Contexto geopolítico

Durante décadas, la geopolítica se midió en barriles de petróleo y kilómetros de territorio. Hoy se mide en nanómetros. Un chip de 3 nanómetros —miles de veces más delgado que un cabello humano— puede contener más poder de cómputo que el que tenía la NASA para enviar el hombre a la Luna.

Israel es un gigante en diseño de semiconductores. Empresas como Tower Semiconductor y la división de Intel en el país generan miles de millones en exportaciones. Irán, sometido a sanciones, busca desesperadamente acceder a esta tecnología para modernizar sus capacidades militares y civiles.

> **Dato clave:** Se estima que Irán ha invertido más de 500 millones de dólares en los últimos cinco años para crear una industria doméstica de semiconductores, con resultados limitados pero en crecimiento.

## ¿Por qué importa?

**Para la seguridad global:**
Si Irán logra acceso a semiconductores avanzados, podría acelerar su programa de drones, misiles y sistemas de defensa. Israel y Estados Unidos lo saben, y por eso la guerra tecnológica es tan importante como la guerra convencional.

**Para la economía mundial:**
La concentración de la producción de chips en el este asiático es una vulnerabilidad estratégica. La pandemia de COVID-19 expuso esta fragilidad cuando las cadenas de suministro se rompieron.

> **Impacto global:** La guerra de los chips está redefiniendo alianzas. países como India, Vietnam y Marruecos están compitiendo para convertirse en nuevos polos de producción de semiconductores.

## Comparación histórica

**Guerra Fría (1947-1991)**
La competencia era por armas nucleares, espacio y petróleo.
**Guerra tecnológica (2020-presente)**
La competencia es por chips, datos e inteligencia artificial.

## Lo que viene

- Estados Unidos invierte 52.000 millones de dólares (CHIPS Act) para recuperar producción.
- La Unión Europea lanza su propio plan de semiconductores.
- China acelera su industria doméstica, aunque sigue dependiendo de tecnología extranjera.
- Irán buscará socios alternativos: Rusia, China y Corea del Norte podrían ser los nuevos proveedores.

## Reflexión

La guerra de los chips nos recuerda que la tecnología no es neutral. Es poder. Y como todo poder, puede usarse para construir o para destruir. La pregunta para países como Colombia no es si participarán en esta guerra tecnológica —porque ya lo hacen como consumidores— sino si estarán en la mesa cuando se definan las reglas.`
    },
    {
title:"El Estrecho de Ormuz: cuando una vía marítima paraliza al mundo",
slug:"estrecho-de-ormuz-via-maritima",
description:"Uno de los puntos más estratégicos del planeta y su impacto sobre la economía global y la geopolítica energética.",
content:`# El Estrecho de Ormuz: cuando una vía marítima paraliza al mundo

**Un estrecho de 33 kilómetros de ancho. Eso es todo lo que separa la estabilidad energética global del caos. Bienvenidos al Estrecho de Ormuz.**

---

## ¿Dónde está y por qué es estratégico?

El Estrecho de Ormuz conecta el Golfo Pérsico con el Golfo de Omán y el Océano Índico. Atraviesan por él:

| Recurso | Cantidad diaria | % del consumo global |
|---------|----------------|---------------------|
| Petróleo | 21 millones de barriles | 21% |
| Gas natural licuado (GNL) | 4.5 millones de toneladas | 25% |

> **Lo esencial:** Una interrupción de una semana en Ormuz paralizaría refinerías en Asia, Europa y África, dispararía los precios del petróleo y sumiría a la economía global en una recesión.

## ¿Qué ocurre cuando hay tensiones?

**2019:** Ataques a tanqueros petroleros cerca del estrecho. EE.UU. acusa a Irán. Los precios del petróleo suben 15% en una semana.

**2020:** EE.UU. asesina al general iraní Qasem Soleimani. Irán amenaza con cerrar el estrecho. El mundo contiene la respiración.

**2023-2024:** Nuevas tensiones por el programa nuclear iraní. La Armada iraní realiza maniobras en la zona. Los seguros marítimos se disparan.

## Los actores involucrados

| Actor | Interés |
|-------|---------|
| Irán | Control estratégico del estrecho, capacidad de presión geopolítica |
| Estados Unidos | Garantizar libre navegación, proteger aliados del Golfo |
| Arabia Saudita | Principal exportador, depende del estrecho para sus ingresos |
| China | Mayor importador de petróleo de la región, vulnerable a cualquier interrupción |
| Japón y Corea del Sur | Dependencia casi total del petróleo que pasa por Ormuz |

> **Impacto para Colombia:** Aunque Colombia no depende del petróleo de Medio Oriente (es exportador neto), una crisis en Ormuz dispararía los precios internacionales del crudo, beneficiando las finanzas del país pero encareciendo los combustibles para los ciudadanos.

## ¿Qué pasaría si se cierra?

**Escenario 1: Cierre parcial**
- Los precios del petróleo suben a 150-200 dólares por barril.
- Recesión global en 6 meses.
- Los países importadores agotan sus reservas estratégicas.

**Escenario 2: Cierre total prolongado**
- Colapso de economías dependientes del petróleo importado.
- Racionamiento de combustible en múltiples países.
- Aceleración de la transición a energías limpias.

## Reflexión

El Estrecho de Ormuz es un recordatorio de lo interdependiente que es el mundo. Una decisión tomada en Teherán puede encarecer la gasolina en Bogotá, afectar el precio de los alimentos en Nairobi y cambiar el resultado de elecciones en Washington. La geopolítica no es un concepto abstracto: es la red invisible que conecta nuestras vidas cotidianas con eventos que ocurren a miles de kilómetros.`
    }
  ];

  for(const a of arts) await create(token,a.title,a.slug,a.description,a.content);
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN CASOS DE ESTUDIO');
}
main().catch(console.error);
