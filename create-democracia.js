const http = require('http');
const HOST = 'localhost', PORT = 1337;
const CATEGORY_ID = 5, AUTHOR_ID = 1;

async function login() {
  const data = JSON.stringify({email:"sebastiansandoval12371@gmail.com",password:"Juansebas0317?"});
  return new Promise((resolve, reject) => {
    const req = http.request({hostname:HOST,port:PORT,path:'/admin/login',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}}, res => {
      let body = ''; res.on('data',c=>body+=c); res.on('end',()=>resolve(JSON.parse(body).data.token));
    }); req.on('error',reject); req.write(data); req.end();
  });
}

async function createArticle(token, title, slug, description, content) {
  const body = JSON.stringify({title,slug,description,content,author:AUTHOR_ID,category:CATEGORY_ID,published_at:new Date().toISOString()});
  return new Promise((resolve, reject) => {
    const req = http.request({hostname:HOST,port:PORT,path:'/articles',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body),'Authorization':`Bearer ${token}`}}, res => {
      let response = ''; res.on('data',c=>response+=c); res.on('end',()=>{console.log(`  ${res.statusCode===200?'✅':'❌'} ${title}`); resolve();});
    }); req.on('error',reject); req.write(body); req.end();
  });
}

async function main() {
  const token = await login();
  console.log('Creando artículos de Democracia...\n');

  const articles = [
    {title:"¿Qué es la democracia y por qué es importante?",slug:"que-es-la-democracia",description:"Una introducción a los principios democráticos y su importancia.",
content:`## Introducción

La democracia es mucho más que un sistema para elegir gobernantes. Es una forma de vida basada en el respeto, la participación y la libertad. Pero, ¿qué significa realmente vivir en democracia?

> **Reflexión:** La democracia no es perfecta, pero como dijo Winston Churchill, es el peor sistema de gobierno exceptuando todos los demás.

## Los pilares de la democracia

Toda democracia sólida se sostiene sobre pilares fundamentales:

- **Soberanía popular:** el poder reside en el pueblo.
- **Pluralismo:** múltiples voces y opiniones son bienvenidas.
- **Estado de Derecho:** nadie está por encima de la ley.
- **Derechos humanos:** garantías fundamentales para todos.
- **Participación:** los ciudadanos inciden en las decisiones públicas.

## Tipos de democracia

| Tipo | Característica | Ejemplo |
|------|----------------|---------|
| Directa | Los ciudadanos deciden sin intermediarios | Asambleas, referendos |
| Representativa | Los ciudadanos eligen representantes | Congreso, concejos |
| Participativa | Combinación de ambas | Democracia moderna |

> **Dato clave:** Colombia combina elementos de democracia representativa y participativa. La Constitución de 1991 incorporó mecanismos como el referendo, la consulta popular y la revocatoria del mandato.

## ¿Por qué es importante?

La democracia importa porque:
- Protege la dignidad humana.
- Permite la resolución pacífica de conflictos.
- Garantiza la rendición de cuentas.
- Fomenta la igualdad de oportunidades.
- Promueve la innovación y el desarrollo.`},
    {title:"El proyecto de nación y la construcción de ciudadanía",slug:"proyecto-de-nacion-y-ciudadania",description:"La relación entre democracia, identidad nacional y participación ciudadana.",
content:`## Nación y democracia: una relación necesaria

Toda democracia necesita un proyecto de nación que oriente los esfuerzos colectivos. Pero, ¿qué significa construir nación en un país diverso como Colombia?

> **Reflexión:** La nación no es un dato natural, sino una construcción permanente. Todos los días, con nuestras acciones, construimos o debilitamos el proyecto nacional.

## Elementos de un proyecto de nación

1. **Identidad compartida:** valores, símbolos y relatos que unen a la comunidad.
2. **Instituciones sólidas:** Estado de Derecho que garantice la convivencia.
3. **Inclusión:** reconocimiento de la diversidad étnica, cultural y regional.
4. **Visión de futuro:** objetivos colectivos que trascienden los gobiernos.

## La construcción de ciudadanía

Ser ciudadano implica más que tener un documento de identidad. Implica:

**Derechos:**
- A elegir y ser elegido.
- A la libertad de expresión.
- Al debido proceso.
- A la participación política.

**Responsabilidades:**
- Votar de manera informada.
- Respetar las leyes.
- Participar en asuntos públicos.
- Contribuir al bien común.

> **¿Sabías que?** Colombia estableció la acción de tutela en 1991 como un mecanismo rápido para que cualquier ciudadano pueda proteger sus derechos fundamentales. Es una de las herramientas más poderosas de la ciudadanía colombiana.

## El desafío colombiano

Colombia es un país de regiones diversas, culturas múltiples y tradiciones políticas variadas. Construir un proyecto de nación incluyente requiere reconocer esta diversidad como una fortaleza, no como un obstáculo.`},
    {title:"La construcción de lo público en una sociedad democrática",slug:"construccion-de-lo-publico",description:"Cómo los ciudadanos contribuyen al fortalecimiento de los espacios públicos.",
content:`## ¿Qué es lo público?

Lo público no es simplemente lo que pertenece al Estado. Es el espacio donde los ciudadanos se encuentran para deliberar, decidir y actuar conjuntamente sobre los asuntos que afectan a todos.

> **Cita destacada:** "Lo público es el espacio de todos, construido por todos y para todos."

## Los espacios de lo público

**Espacios físicos:**
- Plazas, parques, calles.
- Bibliotecas y centros culturales.
- Sedes institucionales abiertas a la ciudadanía.

**Espacios deliberativos:**
- Cabildos abiertos y audiencias públicas.
- Debates legislativos y sesiones de concejos.
- Foros y paneles de discusión ciudadana.

**Espacios digitales:**
- Plataformas de gobierno abierto.
- Redes sociales para debate público.
- Portales de datos abiertos.

## ¿Cómo fortalecer lo público?

1. Participando activamente en espacios de deliberación.
2. Exigiendo transparencia en la gestión pública.
3. Cuidando los bienes comunes.
4. Informándose para opinar con fundamento.
5. Denunciando la corrupción y los abusos.

> **Ejemplo práctico:** En Bogotá, los presupuestos participativos permiten que los ciudadanos decidan directamente cómo invertir parte del presupuesto local en sus barrios. Es un ejemplo concreto de cómo se construye lo público desde la participación ciudadana.

## Reflexión final

Lo público se fortalece o se debilita con cada acción ciudadana. Cuidar un parque, asistir a un cabildo, exigir transparencia o simplemente informarse son formas de construir lo público todos los días.`},
    {title:"Aprendizajes para la convivencia social",slug:"aprendizajes-para-la-convivencia-social",description:"La importancia de la convivencia dentro de un sistema democrático.",
content:`## La democracia como ejercicio de convivencia

La democracia no es solo un sistema de gobierno. Es, ante todo, un conjunto de prácticas y valores que hacen posible la convivencia entre personas que piensan diferente.

> **Reflexión:** En democracia, el disenso no es un problema. Es la base sobre la cual se construyen acuerdos legítimos.

## Principios para la convivencia democrática

**Respeto activo**
No se trata solo de tolerar al que piensa diferente, sino de reconocer su dignidad y su derecho a disentir.

**Diálogo genuino**
Escuchar para entender, no para responder. El diálogo democrático busca acuerdos, no imposiciones.

**Gestion pacífica de conflictos**
Los conflictos son naturales en toda sociedad. La democracia ofrece canales institucionales para resolverlos sin violencia.

**Solidaridad**
El bienestar individual está ligado al bienestar colectivo.

## Habilidades para la convivencia

- Escucha activa y empatía.
- Pensamiento crítico para evaluar información.
- Capacidad de negociación y búsqueda de consensos.
- Resiliencia frente a la frustración política.

## El caso colombiano

Colombia ha vivido décadas de conflicto armado, pero también ha desarrollado experiencias valiosas de convivencia y reconciliación. El proceso de paz de 2016 demostró que incluso las diferencias más profundas pueden resolverse por la vía del diálogo.

> **Para recordar:** La convivencia democrática no es un estado al que se llega, sino un proceso que se construye día a día, con cada interacción, cada decisión y cada gesto de respeto hacia los demás.`},
    {title:"Los principios básicos de la democracia",slug:"principios-basicos-de-la-democracia",description:"Los fundamentos que permiten el funcionamiento de los sistemas democráticos.",
content:`## Los cimientos de la vida democrática

La democracia no es un estado de cosas que se alcanza de una vez y para siempre. Es un sistema que requiere principios sólidos para funcionar correctamente.

## Principios fundamentales

### 1. Soberanía popular
El poder político emana del pueblo. Los gobernantes son mandatarios, no propietarios del poder.

### 2. Igualdad
Todos los ciudadanos tienen los mismos derechos y obligaciones. Nadie está por encima de la ley.

### 3. Libertad
Las personas pueden actuar, pensar y expresarse libremente, siempre que no vulneren los derechos de otros.

### 4. Pluralismo
La diversidad de opiniones, creencias y formas de vida no solo se tolera, sino que se valora como una riqueza social.

### 5. Participación
Los ciudadanos tienen derecho a incidir en las decisiones que afectan sus vidas.

### 6. Rendición de cuentas
Los gobernantes deben informar y justificar sus acciones ante la ciudadanía.

> **Conceptos clave:** La rendición de cuentas (*accountability*) es el principio que obliga a los funcionarios públicos a explicar sus decisiones y a asumir las consecuencias de sus actos. Sin rendición de cuentas, la democracia pierde su esencia.

## Principios vs. realidad

| Principio | Ideal | Desafío en Colombia |
|-----------|-------|---------------------|
| Soberanía popular | El pueblo decide | Baja participación electoral |
| Igualdad | Todos ante la ley | Desigualdad económica y social |
| Libertad | Expresión sin censura | Estigmatización de líderes sociales |
| Pluralismo | Diversidad valorada | Polarización política |

## Reflexión

Estos principios no son adornos retóricos. Son las reglas del juego democrático. Cuando se debilitan, la democracia se erosiona. Cuando se fortalecen, la democracia se profundiza.`},
    {title:"Derechos y libertades en la Constitución Política de Colombia",slug:"derechos-y-libertades-constitucion-colombia",description:"El papel de la Constitución en la protección de los ciudadanos.",
content:`## La Constitución como escudo de derechos

La Constitución Política de 1991 es mucho más que un conjunto de normas. Es el pacto fundacional que define los derechos y libertades de los colombianos y establece los mecanismos para protegerlos.

> **Cita destacada:** "Colombia es un Estado Social de Derecho fundado en el respeto de la dignidad humana." — Artículo 1, Constitución de 1991

## Las libertades fundamentales

**Libertad de expresión**
Toda persona tiene derecho a expresar y difundir su pensamiento sin censura previa. Es la base del debate público y del control ciudadano.

**Libertad de asociación**
Los ciudadanos pueden reunirse y formar organizaciones para fines legítimos: sindicatos, partidos políticos, ONG, juntas de acción comunal.

**Libertad de culto**
El Estado colombiano es laico y garantiza la libertad de conciencia y religión.

**Libertad de locomoción**
Todo colombiano puede circular libremente por el territorio nacional.

**Derecho a la participación política**
Elegir y ser elegido, participar en consultas y ejercer mecanismos de participación.

> **¿Sabías que?** Colombia tiene uno de los sistemas de tutela más efectivos del mundo. En 2023, se presentaron más de 600.000 acciones de tutela, la mayoría relacionadas con el derecho a la salud.

## Derechos de protección

Además de las libertades, la Constitución establece derechos de protección:

- Debido proceso.
- Igualdad ante la ley.
- Honra y buen nombre.
- Petición.
- Acceso a la información pública.

## La progresividad de los derechos

Los derechos constitucionales no son estáticos. La Corte Constitucional ha interpretado y ampliado su alcance a lo largo de los años, adaptándolos a las nuevas realidades sociales y tecnológicas.

## Para recordar

Los derechos constitucionales no son concesiones del gobierno. Son límites al poder que los ciudadanos pueden exigir y defender. Conocerlos es el primer paso para ejercerlos.`},
    {title:"Derechos fundamentales: la base de la dignidad humana",slug:"derechos-fundamentales-base-dignidad-humana",description:"La importancia de los derechos fundamentales dentro del sistema democrático.",
content:`## El núcleo inviolable de la persona

Los derechos fundamentales son aquellos derechos inherentes a la persona humana que el Estado debe respetar y garantizar. Son el núcleo duro de la dignidad humana.

> **Reflexión:** Los derechos fundamentales no se conceden. Se reconocen. Existen antes del Estado y el Estado existe para protegerlos.

## Características de los derechos fundamentales

- **Universalidad:** pertenecen a todas las personas sin distinción.
- **Inalienabilidad:** no pueden ser transferidos ni renunciados.
- **Irrenunciabilidad:** nadie puede renunciar a ellos.
- **Imprescriptibilidad:** no se pierden con el tiempo.
- **Indivisibilidad:** todos son igualmente importantes.

## Los derechos fundamentales en Colombia

La Constitución de 1991 establece en su Título II los derechos fundamentales:

| Derecho | Protección | Mecanismo |
|---------|-----------|-----------|
| Vida | Integridad personal | Tutela |
| Igualdad | No discriminación | Tutela |
| Libertad de expresión | Opinión y prensa | Tutela |
| Debido proceso | Justicia imparcial | Tutela |
| Intimidad | Privacidad y datos | Tutela |
| Petición | Respuestas oportunas | Tutela |

## La acción de tutela

Es el mecanismo estrella de la Constitución de 1991. Permite a cualquier persona acudir ante un juez para solicitar la protección inmediata de sus derechos fundamentales cuando son vulnerados o amenazados por una autoridad pública o un particular.

> **Dato clave:** La tutela es gratuita, no requiere abogado en todos los casos y el juez debe resolver en un plazo máximo de 10 días. Es una herramienta verdaderamente accesible para todos los ciudadanos.

## Reflexión final

Los derechos fundamentales son la conquista más importante de la democracia moderna. Protegerlos no es tarea exclusiva de los jueces. Cada ciudadano tiene la responsabilidad de respetarlos y defenderlos.`},
    {title:"Derechos sociales, económicos y culturales",slug:"derechos-sociales-economicos-culturales",description:"Garantías que buscan mejorar la calidad de vida de las personas.",
content:`## Más allá de las libertades individuales

Los derechos sociales, económicos y culturales representan una dimensión esencial de la ciudadanía moderna. No basta con ser libre; es necesario tener condiciones materiales para ejercer esa libertad.

> **Cita destacada:** "La libertad de los pobres no es libertad, es una quimera." — Ferdinand Lassalle

## ¿Qué son los DESC?

Los derechos económicos, sociales y culturales (DESC) garantizan condiciones de vida digna:

**Derecho a la educación**
Acceso a educación gratuita y de calidad en todos los niveles.

**Derecho a la salud**
Atención médica oportuna, eficiente y de calidad para todos.

**Derecho al trabajo**
Oportunidades laborales en condiciones justas y dignas.

**Derecho a la seguridad social**
Protección frente a riesgos como enfermedad, vejez y desempleo.

**Derecho a la vivienda digna**
Acceso a una vivienda adecuada y servicios básicos.

**Derecho a la cultura**
Participación en la vida cultural y acceso al patrimonio.

## El debate sobre su exigibilidad

A diferencia de los derechos fundamentales, los DESC suelen ser de carácter progresivo:

- El Estado debe avanzar gradualmente en su garantía.
- Dependen de la disponibilidad de recursos.
- Los jueces pueden ordenar su cumplimiento en casos concretos.
- La Corte Constitucional ha ampliado su protección vía tutela.

> **Ejemplo práctico:** La Corte Constitucional ha ordenado al Estado garantizar el acceso a tratamientos médicos de alto costo cuando están en juego la vida y la salud de las personas, incluso si no están incluidos en el plan de beneficios.

## DESC en Colombia

| Derecho | Avances | Desafíos |
|---------|---------|----------|
| Educación | Cobertura casi universal en básica primaria | Calidad y acceso a educación superior |
| Salud | Cobertura del 95% en aseguramiento | Oportunidad y calidad del servicio |
| Trabajo | Legislación laboral protectora | Informalidad (55%+) |
| Vivienda | Programas de subsidios | Déficit cuantitativo y cualitativo |

## Para recordar

Los derechos sociales no son caridad ni favores del Estado. Son compromisos constitucionales que el Estado debe cumplir y los ciudadanos pueden exigir.`},
    {title:"Derechos colectivos y protección del medio ambiente",slug:"derechos-colectivos-y-medio-ambiente",description:"La defensa de intereses que benefician a toda la comunidad.",
content:`## Bienes que nos pertenecen a todos

No todos los derechos son individuales. Existen derechos que protegen bienes compartidos por la comunidad en su conjunto. Son los derechos colectivos, y su protección es esencial para el bienestar de las generaciones presentes y futuras.

> **Reflexión:** El derecho a un ambiente sano no distingue entre ricos y pobres. El aire que respiramos, el agua que bebemos y los paisajes que disfrutamos son patrimonio de todos.

## Derechos colectivos reconocidos en Colombia

**Medio ambiente sano**
Toda persona tiene derecho a gozar de un ambiente sano. La Constitución de 1991 fue pionera en América Latina al incluir este derecho.

**Espacio público**
Calles, plazas, parques y demás espacios de uso común deben ser protegidos para el disfrute de todos.

**Patrimonio cultural**
El legado histórico, artístico y cultural de la nación debe ser preservado.

**Recursos naturales**
El agua, los minerales, los bosques y la biodiversidad son bienes de la nación.

**Moralidad administrativa**
Los ciudadanos tienen derecho a una administración pública honesta y transparente.

## Mecanismos de protección

| Mecanismo | ¿Para qué sirve? | ¿Quién puede usarlo? |
|-----------|-----------------|---------------------|
| Acción popular | Proteger derechos colectivos | Cualquier persona |
| Acción de grupo | Reparar daños a un grupo | Grupo afectado |
| Acción de cumplimiento | Exigir cumplimiento de normas | Cualquier persona |

> **Dato clave:** Colombia fue uno de los primeros países del mundo en reconocer derechos a la naturaleza. En 2017, la Corte Constitucional declaró al río Atrato como sujeto de derechos, un precedente histórico para el constitucionalismo ecológico.

## El derecho al medio ambiente en acción

Ejemplos de protección ambiental en Colombia:

- Consultas populares para decidir sobre proyectos minero-energéticos.
- Acciones populares para proteger páramos y fuentes hídricas.
- Sentencias que ordenan la recuperación de ecosistemas degradados.
- Litigio climático: ciudadanos que demandan al Estado por incumplir metas ambientales.

## Para recordar

Los derechos colectivos nos recuerdan que hay bienes que no pueden ser reducidos a propiedad privada. El agua, el aire, la cultura y el espacio público son herencia común que debemos proteger juntos.`},
    {title:"Mecanismos de protección de los derechos en Colombia",slug:"mecanismos-de-proteccion-de-derechos",description:"Las herramientas jurídicas disponibles para la defensa de los derechos.",
content:`## Un arsenal jurídico para los ciudadanos

La Constitución de 1991 no solo reconoció derechos, sino que creó mecanismos efectivos para protegerlos. El acceso a la justicia dejó de ser un privilegio para convertirse en una herramienta al alcance de todos.

> **Reflexión:** Un derecho sin mecanismo de protección es solo una declaración de buenas intenciones. La Constitución de 1991 entendió esto y creó herramientas concretas para defender los derechos.

## Los principales mecanismos

### Acción de tutela (Art. 86)
Protege derechos fundamentales vulnerados o amenazados por cualquier autoridad pública o particular.

**Características:**
- Gratuita y sin formalismos.
- Debe resolverse en 10 días.
- No requiere abogado.
- Procede contra particulares en ciertos casos.

### Acciones populares (Art. 88)
Protegen derechos e intereses colectivos (medio ambiente, espacio público, patrimonio cultural).

### Acciones de grupo
Protegen a un grupo de personas que han sufrido un daño común (ej: consumidores afectados por un producto defectuoso).

### Acción de cumplimiento
Permite exigir a una autoridad pública el cumplimiento de una ley o acto administrativo que esté ignorando.

### Habeas Corpus
Protege la libertad personal cuando alguien es privado de ella ilegalmente.

### Derecho de petición
Toda persona puede presentar solicitudes respetuosas a las autoridades y obtener respuesta oportuna.

> **¿Sabías que?** Colombia es uno de los pocos países donde la acción de tutela puede interponerse incluso verbalmente. Si una persona no sabe escribir o no tiene acceso a un abogado, puede acudir a cualquier juzgado y solicitar verbalmente la protección de sus derechos.

## ¿Cómo usar estos mecanismos?

**Paso 1:** Identificar el derecho vulnerado.
**Paso 2:** Determinar quién lo está vulnerando.
**Paso 3:** Elegir el mecanismo adecuado.
**Paso 4:** Acudir a la autoridad competente.
**Paso 5:** Hacer seguimiento a la decisión.

## Para recordar

Estos mecanismos son herramientas de poder ciudadano. Conocerlos es el primer paso para usarlos. La justicia no es solo responsabilidad de los jueces: también es responsabilidad de los ciudadanos que la activan.`},
    {title:"Democracia y tecnología en el siglo XXI",slug:"democracia-y-tecnologia-siglo-xxi",description:"Los cambios que la tecnología ha generado en la participación ciudadana.",
content:`## La democracia en la era digital

La tecnología ha transformado casi todos los aspectos de nuestras vidas, y la democracia no es la excepción. Desde el voto electrónico hasta las campañas en redes sociales, el siglo XXI plantea tanto oportunidades como riesgos para los sistemas democráticos.

> **Reflexión:** La tecnología no es buena ni mala para la democracia. Todo depende de cómo la usemos.

## Oportunidades de la tecnología para la democracia

**Mayor acceso a la información**
Los ciudadanos pueden acceder a datos, noticias y documentos públicos como nunca antes.

**Participación ampliada**
Plataformas digitales permiten consultas, peticiones y debates a gran escala.

**Transparencia**
Gobierno abierto, datos públicos y monitoreo ciudadano en tiempo real.

**Movilización**
Las redes sociales permiten organizar movimientos sociales de manera rápida y eficiente.

## Riesgos y desafíos

**Desinformación y noticias falsas**
Las redes sociales facilitan la propagación de contenido falso diseñado para manipular la opinión pública.

**Cámaras de eco**
Los algoritmos tienden a mostrarnos contenido que refuerza nuestras creencias, polarizando el debate.

**Vigilancia masiva**
Los gobiernos pueden usar tecnología para monitorear a ciudadanos y opositores políticos.

**Brecha digital**
Millones de personas quedan excluidas de la participación digital por falta de acceso o habilidades.

> **Dato clave:** Según el DANE, en 2023 solo el 60% de los hogares colombianos tenía acceso a internet. La brecha digital es una brecha democrática.

## Colombia en la era digital

Colombia ha avanzado en gobierno digital: trámites en línea, datos abiertos y plataformas de participación. Sin embargo, persisten desafíos como la desinformación durante procesos electorales y la necesidad de regular el uso de datos personales.

## Para recordar

La tecnología es una herramienta, no un fin. La calidad de la democracia sigue dependiendo de ciudadanos informados, críticos y participativos, usen o no tecnología para ejercer su ciudadanía.`},
    {title:"Participación ciudadana: más allá del derecho al voto",slug:"participacion-ciudadana-mas-alla-del-voto",description:"Las diferentes formas en que los ciudadanos pueden intervenir en los asuntos públicos.",
content:`## La democracia no termina en las urnas

Votar cada cuatro años es importante, pero la democracia no se agota ahí. Existen múltiples formas de participación que permiten a los ciudadanos incidir en las decisiones públicas de manera continua.

> **Reflexión:** La democracia es como un jardín: si solo se riega cada cuatro años, se seca.

## Mecanismos de participación en Colombia

### Participación electoral
- Voto en elecciones nacionales, departamentales y municipales.
- Voto en consultas populares y referendos.

### Participación directa
- **Cabildo abierto:** espacio de discusión entre ciudadanos y autoridades locales.
- **Iniciativa legislativa:** los ciudadanos pueden presentar proyectos de ley.
- **Referendo:** aprobación o rechazo popular de decisiones importantes.
- **Consulta popular:** decisión sobre asuntos de interés local o nacional.
- **Revocatoria del mandato:** destitución anticipada de un funcionario electo.

### Participación social
- **Veedurías ciudadanas:** vigilancia de la gestión pública.
- **Juntas de acción comunal:** organización en barrios y veredas.
- **ONG y fundaciones:** trabajo organizado por causas sociales.

### Participación digital
- Peticiones en línea.
- Plataformas de presupuestos participativos.
- Consultas virtuales.

> **¿Sabías que?** La Ley 1757 de 2015 regula todos los mecanismos de participación ciudadana en Colombia. Su objetivo es facilitar que los ciudadanos incidan en las decisiones públicas.

## Obstáculos a la participación

| Obstáculo | Consecuencia |
|-----------|-------------|
| Falta de información | Participación desinformada |
| Desconfianza institucional | Desinterés por participar |
| Burocracia | Desaliento ciudadano |
| Clientelismo | Participación distorsionada |
| Violencia | Intimidación a líderes |

## Para recordar

La participación ciudadana es un derecho, pero también una responsabilidad. Una democracia saludable necesita ciudadanos activos que no se limiten a votar, sino que vigilen, propongan y construyan lo público todos los días.`},
    {title:"Los desafíos actuales de la democracia",slug:"desafios-actuales-de-la-democracia",description:"Retos que enfrentan los sistemas democráticos en la actualidad.",
content:`## La democracia bajo presión

Las democracias del siglo XXI enfrentan desafíos que ponen a prueba su capacidad de adaptación y respuesta. Desde la desinformación hasta la desigualdad, los sistemas democráticos deben reinventarse para seguir siendo relevantes.

> **Reflexión:** La democracia no está en crisis porque haya fracasado, sino porque el mundo cambió y ella necesita actualizarse.

## 1. La desinformación y las noticias falsas

Las redes sociales han democratizado la capacidad de difundir información, pero también han facilitado la propagación de contenido falso.

**Impactos:**
- Ciudadanos mal informados toman peores decisiones.
- Polarización extrema que dificulta el diálogo.
- Desconfianza en medios e instituciones.
- Procesos electorales vulnerables a la manipulación.

## 2. La desigualdad económica

La democracia promete igualdad política, pero la desigualdad económica la contradice. Cuando el poder económico puede comprar poder político, la democracia se debilita.

**Consecuencias:**
- Captura de la regulación por intereses particulares.
- Menor representación de sectores vulnerables.
- Descontento y apoyo a soluciones autoritarias.

## 3. La polarización política

Las sociedades están cada vez más divididas en bloques enfrentados que se niegan a dialogar.

**Manifestaciones:**
- Cámaras de eco en redes sociales.
- Descalificación personal del adversario.
- Imposibilidad de construir acuerdos básicos.

> **Dato clave:** Según el Latinobarómetro, la confianza en los partidos políticos en América Latina es de apenas el 12%, uno de los niveles más bajos del mundo.

## 4. La lentitud institucional

Las democracias son sistemas deliberativos que requieren tiempo para tomar decisiones. En un mundo que cambia rápidamente, esta lentitud puede ser vista como ineficiencia.

## 5. El auge del autoritarismo

En varios países del mundo, liderazgos autoritarios están ganando popularidad al ofrecer respuestas simples a problemas complejos, erosionando instituciones democráticas.

## ¿Qué podemos hacer?

- Fortalecer la educación ciudadana.
- Promover medios de comunicación independientes.
- Exigir transparencia y rendición de cuentas.
- Participar activamente en espacios democráticos.
- Defender las instituciones y el Estado de Derecho.

> **Para recordar:** La democracia no es un destino, sino un camino. Depende de cada generación defenderla y renovarla para que siga siendo el mejor sistema de gobierno conocido.`
    }
  ];

  for (const article of articles) {
    await createArticle(token, article.title, article.slug, article.description, article.content);
  }
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN DEMOCRACIA');
}
main().catch(console.error);
