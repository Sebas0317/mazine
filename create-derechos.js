const http = require('http');
const HOST = 'localhost', PORT = 1337;
const CATEGORY_ID = 6, AUTHOR_ID = 1;

async function login() {
  const data = JSON.stringify({email:"sebastiansandoval12371@gmail.com",password:"Juansebas0317?"});
  return new Promise((resolve, reject) => {
    const req = http.request({hostname:HOST,port:PORT,path:'/admin/login',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}}, res => {
      let b='';res.on('data',c=>b+=c);res.on('end',()=>resolve(JSON.parse(b).data.token));
    });req.on('error',reject);req.write(data);req.end();
  });
}

async function createArticle(token, title, slug, description, content) {
  const body = JSON.stringify({title,slug,description,content,author:AUTHOR_ID,category:CATEGORY_ID,published_at:new Date().toISOString()});
  return new Promise((resolve, reject) => {
    const req = http.request({hostname:HOST,port:PORT,path:'/articles',method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(body),'Authorization':`Bearer ${token}`}}, res => {
      let r='';res.on('data',c=>r+=c);res.on('end',()=>{console.log(`  ${res.statusCode===200?'✅':'❌'} ${title}`);resolve();});
    });req.on('error',reject);req.write(body);req.end();
  });
}

async function main() {
  const token = await login();
  console.log('Creando artículos de Derechos...\n');
  const articles = [
    {title:"¿Qué son los derechos y por qué son fundamentales para la sociedad?",slug:"que-son-los-derechos",description:"Introducción al concepto de derechos y su importancia.",
content:`## Introducción

Los derechos son mucho más que normas escritas en una constitución. Son conquistas históricas que garantizan la dignidad, la libertad y la igualdad de todas las personas. Pero, ¿qué son realmente y por qué importan?

> **Reflexión:** Los derechos no existen porque el Estado los conceda. Existen porque son inherentes a la dignidad humana. El Estado solo los reconoce y se compromete a protegerlos.

## ¿Qué son los derechos?

Son garantías jurídicas que protegen aspectos fundamentales de la vida humana. Establecen límites al poder y crean condiciones para el desarrollo libre de cada persona.

**Características esenciales:**
- **Universales:** pertenecen a todas las personas.
- **Inalienables:** no pueden ser arrebatados.
- **Irrenunciables:** nadie puede renunciar a ellos.
- **Indivisibles:** todos son igualmente importantes.

## Clasificación de los derechos

| Generación | Tipo | Ejemplos |
|------------|------|----------|
| Primera | Civiles y políticos | Vida, libertad, voto |
| Segunda | Sociales, económicos, culturales | Salud, educación, trabajo |
| Tercera | De solidaridad | Ambiente sano, paz, desarrollo |

> **Dato clave:** La Constitución de 1991 fue pionera al incluir derechos de las tres generaciones en un mismo texto constitucional, estableciendo mecanismos efectivos para su protección.

## ¿Por qué son fundamentales?

Los derechos son fundamentales porque:
- Protegen la dignidad humana.
- Limitan el poder arbitrario.
- Garantizan la participación ciudadana.
- Crean condiciones para la paz social.
- Permiten el desarrollo individual y colectivo.

## Para recordar

Donde no hay derechos, no hay democracia. Donde los derechos no se respetan, la dignidad humana está en riesgo. Conocerlos, exigirlos y defenderlos es responsabilidad de todos.`},
    {title:"La dignidad humana como fundamento de los derechos",slug:"dignidad-humana-fundamento-de-los-derechos",description:"El principio que da origen a todos los derechos.",
content:`## El valor supremo del orden constitucional

La dignidad humana es el principio fundamental sobre el cual se construye todo el sistema de derechos en Colombia. No es un derecho más: es la fuente de todos los derechos.

> **Cita destacada:** "La dignidad humana es el principio fundante del ordenamiento jurídico colombiano." — Corte Constitucional

## ¿Qué significa dignidad humana?

La Corte Constitucional colombiana ha identificado tres dimensiones de la dignidad humana:

**1. Autonomía individual**
Cada persona tiene derecho a vivir según sus propias creencias, valores y proyectos de vida, siempre que no afecte derechos de terceros.

**2. Condiciones materiales dignas**
Toda persona debe tener acceso a las condiciones básicas para una vida digna: alimentación, vivienda, salud, educación.

**3. Integridad física y moral**
Nadie puede ser sometido a tratos crueles, inhumanos o degradantes.

> **Ejemplo práctico:** Cuando la Corte Constitucional protege el derecho de una persona a recibir un tratamiento médico costoso que necesita para sobrevivir, está aplicando el principio de dignidad humana. No importa si el tratamiento está o no en el plan de beneficios: la dignidad está primero.

## La dignidad en la Constitución de 1991

El Artículo 1 de la Constitución establece que Colombia es un Estado Social de Derecho "fundado en el respeto de la dignidad humana". Esto significa que toda interpretación de las leyes debe hacerse a la luz de este principio.

## Dignidad vs. discriminación

La dignidad humana es incompatible con cualquier forma de discriminación. Reconocer la dignidad de cada persona implica:

- Respetar sus decisiones y creencias.
- Garantizar igualdad de oportunidades.
- Proteger a los más vulnerables.
- Prohibir la tortura y los tratos inhumanos.

> **Reflexión:** La dignidad humana no es un concepto abstracto. Se concreta cada vez que tratamos a los demás con respeto, cada vez que exigimos justicia y cada vez que defendemos los derechos de quienes no pueden hacerlo por sí mismos.`},
    {title:"Derechos fundamentales: las garantías esenciales del ciudadano",slug:"derechos-fundamentales-garantias-esenciales",description:"Los derechos que protegen las libertades básicas de todas las personas.",
content:`## El núcleo protegido de la persona

Los derechos fundamentales son el corazón del sistema constitucional colombiano. Son aquellos derechos tan esenciales que su protección no admite demoras ni excusas.

> **Reflexión:** Los derechos fundamentales son como el sistema inmunológico del cuerpo social: protegen contra las amenazas que pueden destruir la democracia.

## Catálogo de derechos fundamentales

La Constitución de 1991 enumera los siguientes derechos fundamentales en su Título II, Capítulo I:

**Derechos individuales:**
- Derecho a la vida.
- Derecho a la igualdad.
- Derecho a la intimidad personal y familiar.
- Derecho al libre desarrollo de la personalidad.
- Libertad de conciencia y de cultos.
- Libertad de expresión y de información.
- Derecho al debido proceso.

**Derechos políticos:**
- Derecho a elegir y ser elegido.
- Derecho a participar en consultas populares.
- Derecho a conformar partidos políticos.

> **¿Sabías que?** La Constitución colombiana establece que los derechos fundamentales deben interpretarse de conformidad con los tratados internacionales de derechos humanos ratificados por Colombia. Esto significa que el bloque de constitucionalidad incluye la Declaración Universal y la Convención Americana.

## Características especiales

- **Aplicación inmediata:** no requieren desarrollo legal para ser exigidos.
- **Protección preferente:** los jueces deben darles prioridad.
- **Efecto irradiación:** inspiran todo el ordenamiento jurídico.
- **Límites:** solo pueden restringirse para proteger otros derechos fundamentales.

## La acción de tutela como escudo

El mecanismo diseñado para proteger los derechos fundamentales es la acción de tutela. Cualquier persona puede acudir ante un juez para solicitar protección inmediata cuando sus derechos fundamentales son vulnerados.

## Para recordar

Los derechos fundamentales no son letra muerta. Son herramientas vivas que los ciudadanos pueden y deben usar para protegerse frente a cualquier abuso de poder.`},
    {title:"El derecho a la igualdad y la lucha contra la discriminación",slug:"derecho-a-la-igualdad",description:"La importancia de garantizar igualdad de oportunidades.",
content:`## Igualdad: el principio que nos hace iguales ante la ley

El derecho a la igualdad es uno de los pilares fundamentales del constitucionalismo moderno. Reconoce que todas las personas merecen el mismo trato y las mismas oportunidades, sin importar sus diferencias.

> **Cita destacada:** "La igualdad no consiste en tratar a todos de la misma manera, sino en tratar de manera diferente lo que es diferente." — Aristóteles

## Dimensiones del derecho a la igualdad

**Igualdad formal**
Todas las personas son iguales ante la ley. Nadie puede ser privilegiado o discriminado arbitrariamente.

**Igualdad material**
El Estado debe tomar medidas para corregir las desigualdades reales que existen en la sociedad. No basta con que la ley diga que todos son iguales; hay que crear condiciones para que esa igualdad sea real.

> **Ejemplo práctico:** Cuando el Estado otorga becas a estudiantes de bajos recursos o implementa acciones afirmativas para grupos históricamente discriminados, no está violando la igualdad: la está haciendo realidad.

## Formas prohibidas de discriminación

La Constitución y la ley prohíben la discriminación por:
- Género, raza, origen étnico o nacional.
- Religión, opinión política o filosófica.
- Orientación sexual o identidad de género.
- Discapacidad, condición social o económica.
- Edad, apariencia física o cualquier otra condición.

## La lucha contra la discriminación en Colombia

| Avances | Desafíos |
|---------|----------|
| Ley de cuotas para mujeres en cargos públicos | Brecha salarial de género |
| Reconocimiento de derechos de parejas del mismo sexo | Discriminación a poblaciones LGBTIQ+ |
| Protección de comunidades afro e indígenas | Racismo estructural |
| Ley de víctimas y restitución de tierras | Exclusión de población desplazada |

> **Dato clave:** La Corte Constitucional ha emitido numerosas sentencias ordenando al Estado proteger a poblaciones vulnerables, incluyendo personas en situación de discapacidad, comunidades indígenas, personas desplazadas y población LGBTIQ+.

## Reflexión final

La igualdad no significa uniformidad. Significa que todas las personas tengan las mismas oportunidades para desarrollar sus proyectos de vida, respetando sus diferencias y particularidades. La lucha contra la discriminación es una tarea permanente que requiere leyes, políticas públicas y, sobre todo, un cambio cultural.`},
    {title:"Libertad de expresión: uno de los pilares de la democracia",slug:"libertad-de-expresion",description:"La importancia de expresar opiniones en una sociedad libre.",
content:`## La savia de la democracia

La libertad de expresión es considerada uno de los derechos más importantes para el funcionamiento de cualquier democracia. Sin ella, no hay debate público, no hay control ciudadano ni hay verdadera participación.

> **Cita destacada:** "La libertad de expresión es la piedra angular de la democracia. Sin ella, todos los demás derechos pierden su sentido." — Corte Constitucional de Colombia

## ¿Qué protege la libertad de expresión?

**Dimensión individual**
Toda persona tiene derecho a expresar sus ideas, opiniones y pensamientos sin censura previa.

**Dimensión colectiva**
La sociedad tiene derecho a recibir información y a conocer diferentes puntos de vista.

**Dimensión política**
Los ciudadanos pueden criticar al gobierno, denunciar injusticias y proponer alternativas.

## Límites de la libertad de expresión

Ningún derecho es absoluto. La libertad de expresión tiene límites:

- No protege la incitación a la violencia.
- No ampara la difamación o la calumnia.
- No permite la pornografía infantil.
- No cubre el discurso de odio.
- No justifica la apología del delito.

> **Reflexión:** La libertad de expresión no significa libertad para decir cualquier cosa sin consecuencias. Significa libertad para expresar ideas sin censura previa, pero asumiendo la responsabilidad por lo que se dice.

## Libertad de expresión en Colombia

**Protección constitucional:**
Artículo 20 de la Constitución: "Se garantiza a toda persona la libertad de expresar y difundir su pensamiento y opiniones, la de informar y recibir información veraz e imparcial."

**Desafíos actuales:**
- Estigmatización de periodistas y líderes sociales.
- Concentración de medios de comunicación.
- Desinformación y noticias falsas.
- Amenazas y violencia contra comunicadores.

## Para recordar

La libertad de expresión es un derecho fundamental que debe ser protegido y ejercido con responsabilidad. Una sociedad que silencia las voces disidentes no es una democracia, es una dictadura.`},
    {title:"El derecho a la educación como herramienta de transformación social",slug:"derecho-a-la-educacion",description:"La educación como motor del desarrollo individual y colectivo.",
content:`## La llave maestra de los derechos

La educación es considerada el derecho más transformador. No solo es valiosa en sí misma, sino que permite el ejercicio de otros derechos y abre puertas a oportunidades que de otra manera serían inalcanzables.

> **Reflexión:** La educación no es solo un derecho. Es la herramienta más poderosa para romper el ciclo de la pobreza y construir una sociedad más justa.

## La educación en la Constitución de 1991

**Artículo 67:** "La educación es un derecho de la persona y un servicio público que tiene una función social."

**Principios constitucionales:**
- Gratuidad en instituciones públicas.
- Obligatoriedad entre los 5 y los 15 años.
- Autonomía universitaria.
- Calidad como criterio esencial.

## El impacto transformador de la educación

**A nivel individual:**
- Mejora las oportunidades laborales.
- Desarrolla pensamiento crítico.
- Empodera para ejercer otros derechos.
- Amplía horizontes personales.

**A nivel social:**
- Reduce la desigualdad.
- Fortalece la democracia.
- Promueve la movilidad social.
- Genera desarrollo económico.

> **Dato clave:** Según el Banco Mundial, cada año adicional de educación aumenta los ingresos de una persona en un promedio del 10%. En países como Colombia, el efecto puede ser aún mayor para poblaciones vulnerables.

## Desafíos de la educación en Colombia

| Logros | Retos |
|--------|-------|
| Cobertura casi universal en primaria | Baja calidad en zonas rurales |
| Matrícula Cero en universidades públicas | Deserción escolar secundaria |
| Programas de alimentación escolar | Brecha digital educativa |
| Educación gratuita obligatoria hasta los 15 | Acceso limitado a educación superior |

## Para recordar

La educación no es un gasto: es la inversión más rentable que puede hacer una sociedad. Garantizar el derecho a la educación de calidad para todos es la mejor estrategia para construir un país más justo, próspero y democrático.`},
    {title:"El derecho a la salud y la protección del bienestar",slug:"derecho-a-la-salud",description:"La importancia de garantizar acceso a servicios de salud dignos.",
content:`## La salud como derecho fundamental

El derecho a la salud es uno de los derechos más invocados y protegidos en Colombia. Su importancia radica en que está directamente conectado con el derecho más básico de todos: el derecho a la vida.

> **Reflexión:** La salud no es un privilegio para quienes pueden pagarla. Es un derecho fundamental que el Estado debe garantizar a todos.

## El derecho a la salud en Colombia

La Corte Constitucional ha declarado que la salud es un derecho fundamental autónomo y no simplemente un derecho social programático.

**Componentes del derecho a la salud:**
- Acceso a servicios médicos oportunos.
- Disponibilidad de medicamentos.
- Calidad en la atención.
- Trato digno y respetuoso.
- Prevención y promoción de la salud.

## El sistema de salud colombiano

**Estructura:**
- **Régimen contributivo:** para trabajadores formales y sus familias.
- **Régimen subsidiado:** para población sin capacidad de pago.
- **Regímenes especiales:** para ciertos grupos (magisterio, fuerzas militares).

> **Dato clave:** Colombia logró una cobertura en salud superior al 95% de la población, uno de los índices más altos de América Latina. Sin embargo, persisten problemas de oportunidad y calidad en la atención.

## La tutela en salud

La acción de tutela ha sido el mecanismo más utilizado para proteger el derecho a la salud:

- Más del 40% de las tutelas en Colombia son sobre salud.
- Los jueces han ordenado tratamientos, medicamentos y cirugías no incluidas en el plan de beneficios.
- La Corte Constitucional ha creado mecanismos para agilizar el acceso a servicios de salud.

## Desafíos actuales

- Sostenibilidad financiera del sistema.
- Oportunidad en la asignación de citas.
- Calidad diferencial entre zonas urbanas y rurales.
- Trato digno a pacientes y familias.

## Para recordar

El derecho a la salud es un compromiso constitucional. Conocerlo y exigirlo a través de mecanismos como la tutela es parte fundamental de una ciudadanía activa e informada.`},
    {title:"Derechos culturales y diversidad en Colombia",slug:"derechos-culturales-y-diversidad",description:"El reconocimiento de la riqueza cultural como parte de los derechos humanos.",
content:`## Una nación plural

Colombia es oficialmente una nación pluriétnica y multicultural. Este reconocimiento constitucional es uno de los mayores avances en materia de derechos culturales en América Latina.

> **Reflexión:** La diversidad cultural no es un problema que deba ser resuelto. Es una riqueza que debe ser protegida y celebrada.

## ¿Qué son los derechos culturales?

Son aquellos derechos que protegen la identidad cultural, las tradiciones y las expresiones artísticas de las personas y las comunidades.

**Incluyen:**
- Derecho a la identidad cultural.
- Derecho a practicar y preservar tradiciones.
- Derecho a la educación bilingüe e intercultural.
- Derecho al acceso y disfrute del patrimonio cultural.
- Derecho a la producción artística y literaria.

## Colombia: una nación de muchas culturas

**Pueblos indígenas:**
Más de 100 pueblos indígenas diferentes con lenguas, cosmovisiones y tradiciones propias.

**Comunidades afrocolombianas:**
Población afrodescendiente con ricas tradiciones musicales, culinarias y culturales.

**Comunidad ROM:**
El pueblo gitano, reconocido como parte de la diversidad étnica colombiana.

**Culturas regionales:**
Costa Caribe, Pacifico, Andina, Llanos Orientales, Amazonia: cada región con identidad propia.

> **¿Sabías que?** Colombia tiene 68 lenguas indígenas reconocidas oficialmente, además del español y las lenguas criollas. Es uno de los países con mayor diversidad lingüística de América.

## Protección constitucional

La Constitución de 1991 reconoce y protege la diversidad étnica y cultural de la nación colombiana. Este reconocimiento implica:
- Derecho a la consulta previa de comunidades étnicas.
- Circunscripciones especiales indígenas y afro en el Congreso.
- Jurisdicción especial indígena.
- Educación intercultural bilingüe.

## Para recordar

La diversidad cultural colombiana es una de nuestras mayores riquezas. Proteger los derechos culturales significa garantizar que todas las culturas puedan existir, desarrollarse y enriquecer la vida nacional.`},
    {title:"Derechos colectivos y protección del medio ambiente",slug:"derechos-colectivos-y-proteccion-ambiental",description:"La defensa de intereses que benefician a toda la sociedad.",
content:`## Bienes comunes que nos pertenecen a todos

Los derechos colectivos protegen aquello que no puede ser dividido ni apropiado individualmente. El aire que respiramos, el agua que bebemos, los parques que disfrutamos: son bienes que nos pertenecen a todos y que debemos proteger juntos.

> **Reflexión:** Los derechos colectivos nos recuerdan que hay bienes que trascienden a los individuos y que son patrimonio de la humanidad.

## Principales derechos colectivos en Colombia

**Ambiente sano**
Toda persona tiene derecho a gozar de un ambiente sano. Es deber del Estado proteger la diversidad e integridad del ambiente.

**Espacio público**
Calles, plazas, parques y zonas verdes son bienes de uso público que no pueden ser privatizados ni cercados.

**Patrimonio cultural**
Monumentos, sitios históricos, tradiciones y manifestaciones culturales deben ser preservados.

**Moralidad administrativa**
Los ciudadanos tienen derecho a una gestión pública honesta y transparente.

**Seguridad y salubridad públicas**
El Estado debe garantizar condiciones básicas de seguridad sanitaria y ciudadana.

## Acciones populares: el mecanismo de protección

Las acciones populares son el mecanismo diseñado para proteger los derechos colectivos. Cualquier persona puede interponer una acción popular para defender un derecho colectivo amenazado o vulnerado.

> **Ejemplo práctico:** Un grupo de ciudadanos puede interponer una acción popular para impedir la construcción de una carretera que destruiría un páramo, fuente de agua para miles de personas.

## Colombia y el constitucionalismo ambiental

Colombia ha sido pionera en el reconocimiento de derechos a la naturaleza:

- **2017:** la Corte Constitucional declaró al río Atrato como sujeto de derechos.
- **2018:** la Corte declaró a la Amazonía colombiana como sujeto de derechos.
- Estos fallos ordenan al Estado proteger estos ecosistemas y consultar a las comunidades afectadas.

## Desafíos actuales

- Deforestación en la Amazonía.
- Contaminación de fuentes hídricas.
- Pérdida de biodiversidad.
- Cambio climático y sus impactos.
- Conflictos entre desarrollo económico y protección ambiental.

## Para recordar

Los derechos colectivos nos recuerdan que hay bienes que no pueden ser reducidos a mercancía. El agua, el aire y la cultura son herencia común que debemos proteger para las generaciones futuras.`},
    {title:"Los derechos digitales en la era de Internet",slug:"derechos-digitales",description:"Nuevos desafíos para la protección de los ciudadanos en entornos digitales.",
content:`## La frontera digital de los derechos humanos

Internet ha transformado la forma en que nos informamos, nos comunicamos y participamos en la vida pública. Pero esta transformación también ha planteado preguntas fundamentales sobre cómo proteger los derechos en el entorno digital.

> **Reflexión:** Los derechos que tenemos en el mundo físico también deben protegerse en el mundo digital. La tecnología no puede ser una excusa para vulnerar la dignidad humana.

## ¿Qué son los derechos digitales?

Son la aplicación de los derechos humanos tradicionales al entorno digital:

**Privacidad y protección de datos**
Toda persona tiene derecho a controlar su información personal y a saber cómo es utilizada.

**Libertad de expresión en línea**
El derecho a expresarse libremente también aplica en redes sociales y plataformas digitales.

**Acceso a Internet**
El acceso a la red es cada vez más considerado un derecho necesario para ejercer otros derechos.

**Neutralidad de la red**
Todos los contenidos en Internet deben ser tratados por igual, sin discriminación ni bloqueos arbitrarios.

**Seguridad digital**
Derecho a protegerse contra ataques cibernéticos, robo de identidad y vigilancia masiva.

> **Dato clave:** Colombia cuenta con una de las leyes de protección de datos más avanzadas de América Latina (Ley 1581 de 2012), que regula la recolección, almacenamiento y uso de datos personales.

## Desafíos de los derechos digitales en Colombia

| Desafío | Impacto |
|---------|---------|
| Brecha digital | 40% de hogares sin Internet |
| Desinformación | Manipulación electoral |
| Vigilancia masiva | Riesgos a la privacidad |
| Ciberseguridad | Aumento de ciberataques |
| Regulación de IA | Dilemas éticos y legales |

## El derecho al olvido

Uno de los debates más actuales en derechos digitales es el derecho al olvido: la posibilidad de que una persona solicite la eliminación de información personal que ya no es relevante o que la perjudica.

## Para recordar

Los derechos digitales son la evolución natural de los derechos humanos. En un mundo cada vez más digitalizado, proteger estos derechos es esencial para garantizar la libertad, la privacidad y la dignidad de las personas.`},
    {title:"La acción de tutela: una herramienta para proteger derechos",slug:"accion-de-tutela",description:"Uno de los mecanismos más importantes de la Constitución de 1991.",
content:`## El mecanismo estrella de la Constitución de 1991

La acción de tutela es, sin duda, uno de los mayores legados de la Constitución de 1991. Ha transformado la forma en que los ciudadanos colombianos acceden a la justicia y protegen sus derechos.

> **Reflexión:** La tutela democratizó el acceso a la justicia. Antes de 1991, proteger un derecho podía tomar años. Con la tutela, la respuesta llega en días.

## ¿Qué es la acción de tutela?

Es un mecanismo judicial creado por el Artículo 86 de la Constitución para proteger de manera inmediata los derechos fundamentales cuando son vulnerados o amenazados.

**Características principales:**
- **Gratuita:** no cuesta nada interponerla.
- **Informal:** no requiere abogado ni formalidades complejas.
- **Rápida:** el juez debe decidir en máximo 10 días.
- **Preferente:** los jueces deben darle prioridad sobre otros casos.
- **Eficaz:** procede contra autoridades y contra particulares.

## ¿Cómo funciona?

**Paso 1:** Identificar el derecho fundamental vulnerado.
**Paso 2:** Redactar una solicitud sencilla explicando los hechos.
**Paso 3:** Presentarla ante cualquier juez del lugar donde ocurrió la vulneración.
**Paso 4:** El juez admite, investiga y decide en 10 días.
**Paso 5:** Si es necesario, la decisión puede revisarse en instancias superiores.

> **Dato clave:** La Corte Constitucional revisa de manera discrecional una selección de las tutelas para unificar jurisprudencia y establecer precedentes vinculantes.

## Impacto de la tutela en Colombia

- Más de 600.000 tutelas se presentan cada año.
- El derecho más tutelado es la salud (más del 40%).
- La mayoría de las tutelas son falladas a favor del ciudadano.
- Ha obligado al Estado a garantizar derechos en casos concretos.
- Ha creado una cultura de exigibilidad de derechos.

## Para recordar

La acción de tutela es el mecanismo más poderoso que tiene el ciudadano colombiano para defender sus derechos. Conocerla y usarla correctamente es una herramienta esencial de participación y control ciudadano.`},
    {title:"Derechos humanos y organismos internacionales",slug:"derechos-humanos-y-organismos-internacionales",description:"La protección de los derechos más allá de las fronteras nacionales.",
content:`## Los derechos no tienen fronteras

La protección de los derechos humanos trasciende las fronteras nacionales. Existe un sistema internacional de protección que complementa los mecanismos nacionales y que los Estados están obligados a respetar.

> **Reflexión:** Los derechos humanos no son una invención occidental ni una imposición externa. Son conquistas universales que pertenecen a todos los pueblos.

## El sistema universal: Naciones Unidas

**Declaración Universal de Derechos Humanos (1948)**
Documento fundacional que establece los derechos básicos que todos los Estados deben respetar.

**Órganos de protección:**
- Consejo de Derechos Humanos.
- Comité de Derechos Humanos.
- Alto Comisionado para los Derechos Humanos.
- Tribunales Penales Internacionales.

## El sistema interamericano

Colombia hace parte del Sistema Interamericano de Derechos Humanos, que incluye:

**Comisión Interamericana de Derechos Humanos (CIDH)**
Recibe peticiones, realiza visitas y emite recomendaciones a los Estados.

**Corte Interamericana de Derechos Humanos**
Tribunal que juzga casos de violaciones graves de derechos humanos en la región. Sus sentencias son vinculantes para Colombia.

> **¿Sabías que?** Colombia es uno de los países con más casos ante el Sistema Interamericano, producto de décadas de conflicto armado. Sin embargo, también es uno de los que más ha cumplido con las sentencias y recomendaciones.

## Otros organismos relevantes

- **Comité contra la Tortura** (ONU).
- **Comité para la Eliminación de la Discriminación Racial.**
- **Comité de los Derechos del Niño.**
- **Corte Penal Internacional:** juzga crímenes de guerra y lesa humanidad.

## La importancia de los mecanismos internacionales

Los organismos internacionales son importantes porque:
- Establecen estándares mínimos de protección.
- Ofrecen una instancia cuando los mecanismos nacionales fallan.
- Presionan a los Estados para que cumplan sus obligaciones.
- Documentan y visibilizan violaciones de derechos.

## Para recordar

Los derechos humanos son universales e indivisibles. El sistema internacional de protección es un respaldo fundamental para los ciudadanos y una herramienta para exigir justicia cuando las instituciones nacionales no responden adecuadamente.`},
    {title:"Los desafíos actuales para la protección de los derechos",slug:"desafios-proteccion-de-derechos",description:"Retos contemporáneos para garantizar el respeto de los derechos humanos.",
content:`## La lucha continúa

A pesar de los avances en el reconocimiento de derechos, su protección efectiva enfrenta desafíos cada vez más complejos en el siglo XXI. Conocer estos desafíos es el primer paso para enfrentarlos.

> **Reflexión:** Los derechos no se conquistan de una vez y para siempre. Cada generación debe defenderlos y adaptarlos a los nuevos tiempos.

## 1. La desigualdad persistente

La desigualdad económica y social es uno de los mayores obstáculos para la realización de los derechos. Cuando unos pocos acumulan la riqueza mientras millones carecen de lo básico, los derechos se convierten en promesas vacías.

**Impacto en derechos:**
- Acceso desigual a salud y educación.
- Discriminación estructural.
- Exclusión política de sectores vulnerables.
- Violencia asociada a la desigualdad.

## 2. Los conflictos armados y la violencia

Millones de personas en el mundo viven en zonas de conflicto donde los derechos más básicos son violados sistemáticamente.

**En Colombia:**
- Asesinato de líderes sociales y defensores de derechos humanos.
- Desplazamiento forzado.
- Reclutamiento de menores.
- Violencia sexual en el conflicto.

> **Dato clave:** Colombia tiene más de 8 millones de víctimas registradas del conflicto armado, una de las cifras más altas del mundo.

## 3. La discriminación y el odio

El racismo, la xenofobia, la homofobia y otras formas de discriminación siguen siendo desafíos globales. Las redes sociales han amplificado el discurso de odio.

## 4. Las nuevas tecnologías

La inteligencia artificial, el big data y la vigilancia masiva plantean riesgos para la privacidad, la libertad de expresión y la igualdad.

## 5. La crisis climática

El cambio climático amenaza derechos fundamentales como la vida, la salud, la alimentación y la vivienda, especialmente para las poblaciones más vulnerables.

## 6. La migración forzada

Millones de personas se ven obligadas a dejar sus hogares por conflictos, violencia o desastres naturales, enfrentando vulneraciones masivas de sus derechos.

## ¿Qué podemos hacer?

- Educarnos y educar sobre derechos humanos.
- Exigir a los gobiernos el cumplimiento de sus obligaciones.
- Apoyar a organizaciones que protegen derechos.
- Denunciar violaciones de derechos.
- Participar en la construcción de políticas públicas.
- Defender los derechos de los más vulnerables.

> **Para recordar:** Los derechos humanos son la conquista más importante de la civilización moderna. Defenderlos no es tarea exclusiva de jueces y activistas. Es responsabilidad de cada persona, todos los días.`
    }
  ];

  for (const article of articles) {
    await createArticle(token, article.title, article.slug, article.description, article.content);
  }
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN DERECHOS');
}
main().catch(console.error);
