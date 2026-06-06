const http = require('http');

const HOST = 'localhost';
const PORT = 1337;
const CATEGORY_ID = 4;
const AUTHOR_ID = 1;

async function login() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({email:"sebastiansandoval12371@gmail.com",password:"Juansebas0317?"});
    const options = {
      hostname: HOST, port: PORT, path: '/admin/login',
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data)}
    };
    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body).data.token));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function createArticle(token, title, slug, description, content) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      title, slug, description, content,
      author: AUTHOR_ID,
      category: CATEGORY_ID,
      published_at: new Date().toISOString()
    });
    const options = {
      hostname: HOST, port: PORT, path: '/articles',
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'Authorization': `Bearer ${token}`}
    };
    const req = http.request(options, res => {
      let response = '';
      res.on('data', chunk => response += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`  ✅ ${title}`);
        } else {
          console.log(`  ❌ ${title}: ${res.statusCode} - ${response.substring(0,100)}`);
        }
        resolve();
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('Logging in...');
  const token = await login();
  console.log('Token obtenido. Creando artículos de Estado...\n');

  const articles = [
    {
      title: "¿Qué es el Estado y por qué es fundamental para la sociedad?",
      slug: "que-es-el-estado",
      description: "Una introducción a la importancia del Estado en la organización política y social.",
      content: `## Introducción

El Estado es una de las instituciones más importantes de la vida moderna. Sin embargo, pocas veces nos detenemos a pensar qué es realmente, cómo funciona y por qué es indispensable para la convivencia social.

> **Reflexión:** El Estado es esa estructura invisible que hace posible que la vida en sociedad no sea un caos. Sin él, no habría leyes que cumplir, derechos que proteger ni instituciones que garanticen el orden.

## Los elementos esenciales del Estado

Todo Estado, para ser considerado como tal, debe contar con cuatro elementos fundamentales:

**1. Población**
El conjunto de personas que habitan dentro de un territorio y están vinculadas jurídicamente al Estado. No se trata solo de habitantes, sino de ciudadanos con derechos y obligaciones.

**2. Territorio**
El espacio físico delimitado donde el Estado ejerce su soberanía. Incluye el suelo, el subsuelo, el espacio aéreo y las aguas territoriales.

**3. Soberanía**
La capacidad del Estado de ejercer poder de manera independiente dentro de su territorio, sin aceptar la autoridad de ningún poder externo.

**4. Poder público**
El conjunto de instituciones y autoridades encargadas de gobernar, administrar justicia y crear leyes.

> **Conceptos clave:** La soberanía es lo que diferencia a un Estado de otras formas de organización. Un Estado soberano no reconoce autoridad superior dentro de su territorio.

## ¿Por qué es fundamental el Estado?

**Para garantizar el orden:** sin Estado, imperaría la ley del más fuerte. Las instituciones estatales establecen reglas claras para la convivencia y mecanismos para resolver conflictos.

**Para proteger derechos:** el Estado es el garante de los derechos fundamentales. Sin su protección, derechos como la vida, la libertad o la propiedad serían fácilmente vulnerables.

**Para proveer servicios:** el Estado construye carreteras, administra hospitales, financia escuelas y garantiza el acceso a servicios básicos.

**Para distribuir recursos:** a través de impuestos y políticas públicas, el Estado busca reducir las desigualdades sociales.

> **Dato clave:** Colombia, como Estado Social de Derecho, no solo debe garantizar libertades individuales, sino también promover activamente condiciones de vida digna para toda la población.

## Reflexión final

El Estado no es un ente abstracto ni lejano. Es la estructura que hace posible la vida en sociedad. Conocerlo, entenderlo y exigirle es parte esencial de una ciudadanía activa y responsable.`
    },
    {
      title: "Estado, nación y gobierno: conceptos que no significan lo mismo",
      slug: "estado-nacion-gobierno-diferencias",
      description: "Diferencias fundamentales entre tres conceptos frecuentamente confundidos.",
      content: `## Tres conceptos, una misma realidad política

En el lenguaje cotidiano solemos usar las palabras Estado, nación y gobierno como si significaran lo mismo. Sin embargo, se trata de conceptos distintos que cumplen funciones diferentes dentro de la organización política.

> **Reflexión:** Confundir Estado con gobierno es como confundir un edificio con quien lo habita temporalmente. El Estado permanece; los gobiernos pasan.

## Cuadro comparativo

| Aspecto | Estado | Nación | Gobierno |
|---------|--------|--------|----------|
| Definición | Estructura política y jurídica permanente | Comunidad con vínculos culturales e históricos | Conjunto de autoridades temporales |
| Duración | Permanente | Histórica y culturalmente estable | Temporal (períodos electorales) |
| Elementos | Población, territorio, soberanía, poder público | Identidad, lengua, cultura, historia | Personas que ejercen el poder |
| Ejemplo | El Estado colombiano existe desde 1810 | La nación colombiana como comunidad imaginada | El gobierno de turno (2022-2026) |

## El Estado: la estructura permanente

El Estado es la organización jurídico-política que perdura más allá de los gobiernos y los cambios sociales. Cuando votamos por un nuevo presidente, el Estado sigue siendo el mismo. Las constituciones pueden reformarse, pero el Estado continúa.

**Características del Estado:**
- Tiene existencia jurídica reconocida internacionalmente.
- Ejerce soberanía sobre un territorio.
- Cuenta con instituciones que trascienden períodos de gobierno.
- Es sujeto de derecho internacional.

> **¿Sabías que?** Colombia ha tenido varias constituciones (1832, 1843, 1853, 1863, 1886, 1991), pero el Estado colombiano ha sido el mismo desde su fundación.

## La nación: la comunidad imaginada

La nación es un concepto más cultural que jurídico. Se refiere a una comunidad que comparte elementos como la lengua, la historia, las tradiciones o la identidad. No todas las naciones tienen un Estado propio.

**Tipos de naciones:**
- **Naciones con Estado:** la mayoría de los países del mundo.
- **Naciones sin Estado:** como el pueblo kurdo o los pueblos indígenas.
- **Estados plurinacionales:** como Bolivia, que reconoce múltiples naciones dentro de su territorio.

## El gobierno: la administración temporal

El gobierno es el conjunto de personas que ejercen el poder público durante un período determinado. Es la parte más visible del Estado, pero solo una de sus dimensiones.

> **Para recordar:** Puede cambiar el gobierno, pueden transformarse las fronteras, puede evolucionar la identidad nacional, pero el Estado como estructura jurídica permanece.

## Ejemplo colombiano

Colombia es un Estado unitario y descentralizado que reconoce su diversidad étnica y cultural (nación plural). En las elecciones de 2022, cambió el gobierno, pero el Estado colombiano continuó funcionando con normalidad.`
    },
    {
      title: "El origen del Estado: principales teorías explicativas",
      slug: "origen-del-estado-teorias",
      description: "Una mirada a las teorías que intentan explicar cómo surgieron los Estados.",
      content: `## ¿Cómo surgió el Estado?

Una de las preguntas más fascinantes de la ciencia política es cómo y por qué surgieron los Estados. A lo largo de la historia, diferentes pensadores han propuesto teorías para explicar este fenómeno.

> **Cita destacada:** "El Estado no es una realidad impuesta desde arriba, sino una construcción colectiva que responde a la necesidad humana de orden y seguridad."

## Las grandes teorías sobre el origen del Estado

### 1. Teoría del contrato social

Es la más influyente en la tradición occidental. Sostiene que el Estado surge de un acuerdo voluntario entre individuos que deciden crear una autoridad común para protegerse mutuamente.

**Principales exponentes:**

| Pensador | Visión del estado de naturaleza | Tipo de contrato |
|----------|-------------------------------|------------------|
| Thomas Hobbes | Guerra de todos contra todos | Contrato de sumisión al soberano |
| John Locke | Libertad e igualdad naturales | Contrato para proteger derechos |
| Jean-Jacques Rousseau | Bondad natural del ser humano | Contrato de voluntad general |

> **Conceptos clave:** El estado de naturaleza es una construcción teórica que imagina cómo sería la vida sin Estado. Cada filósofo lo describe de manera diferente para justificar su modelo de contrato social.

### 2. Teoría del origen divino

Propia del pensamiento medieval, sostiene que el poder del gobernante proviene directamente de Dios. Fue utilizada durante siglos para justificar monarquías absolutas.

### 3. Teoría de la fuerza o conquista

Sostiene que los Estados surgieron cuando un grupo impuso su dominio sobre otros mediante la fuerza. El Estado sería, en esencia, el resultado de relaciones de dominación.

### 4. Teoría marxista

Para Karl Marx, el Estado es un instrumento de dominación de clase. Surge cuando una clase social logra controlar los medios de producción y necesita una institución para mantener su poder sobre las demás clases.

### 5. Teoría del origen natural (Aristóteles)

El ser humano es un animal político por naturaleza. El Estado surge de manera espontánea como evolución natural de la familia y la aldea.

> **¿Sabías que?** La arqueología moderna sugiere que los primeros Estados surgieron hace unos 5.500 años en Mesopotamia, cuando las comunidades agrícolas necesitaron organizar sistemas de riego, almacenamiento y defensa que requerían una autoridad centralizada.

## ¿Cuál teoría es la correcta?

Ninguna teoría explica por sí sola el origen del Estado. Lo más probable es que diferentes Estados hayan surgido por diferentes razones en diferentes momentos históricos. Sin embargo, todas estas teorías nos ofrecen herramientas valiosas para pensar críticamente sobre el poder, la autoridad y la organización política.

## Reflexión

Comprender las teorías sobre el origen del Estado nos ayuda a entender que la forma actual de organización política no es natural ni inevitable. Es el resultado de procesos históricos complejos que seguimos construyendo.`
    },
    {
      title: "Las formas de Estado a través de la historia",
      slug: "formas-de-estado-a-traves-de-la-historia",
      description: "Cómo han evolucionado las estructuras estatales con el paso del tiempo.",
      content: `## Una evolución de siglos

El Estado no ha tenido siempre la misma forma. A lo largo de la historia, las estructuras estatales han evolucionado para adaptarse a las necesidades cambiantes de las sociedades.

> **Reflexión:** Cada forma de Estado refleja las ideas y los conflictos de su época. Conocer esta evolución nos ayuda a entender el presente.

## Línea de tiempo: evolución de las formas de Estado

**Antigüedad — Ciudades-Estado**
Ciudades independientes como Atenas, Esparta o Roma que funcionaban como Estados autónomos. Tenían sus propias leyes, gobierno y ejército.

**Edad Media — Monarquías feudales**
El poder estaba fragmentado entre reyes, nobles y la Iglesia. No existía un poder centralizado fuerte.

**Siglos XVI-XVIII — Monarquías absolutas**
El poder se concentró en manos del rey, que gobernaba sin límites constitucionales. Luis XIV de Francia es el ejemplo clásico: "El Estado soy yo".

**Siglo XIX — Estado liberal**
Surgió con las revoluciones liberales. Limitó el poder del monarca, estableció constituciones y reconoció derechos individuales.

**Siglo XX — Estado Social de Derecho**
El Estado no solo garantiza libertades, sino que interviene activamente para corregir desigualdades y garantizar el bienestar social.

## Formas de organización territorial

Además de su evolución histórica, los Estados se organizan territorialmente de diferentes maneras:

**Estado unitario**
- Un solo centro de poder político.
- Las regiones tienen autonomía administrativa limitada.
- Ejemplo: Colombia, Francia, Chile.

**Estado federal**
- Varios Estados o regiones con amplia autonomía.
- Existe un gobierno central y gobiernos regionales.
- Ejemplo: Estados Unidos, México, Alemania.

**Estado confederal**
- Unión de Estados soberanos que delegan funciones específicas.
- Los Estados miembros conservan su soberanía.
- Ejemplo: la Unión Europea (aunque es un caso especial).

> **Dato clave:** Colombia es un Estado unitario con descentralización administrativa. La Constitución de 1991 fortaleció la autonomía de los departamentos y municipios, pero sin llegar a ser un Estado federal.

## El Estado colombiano en perspectiva histórica

| Período | Forma de Estado | Constitución |
|---------|-----------------|--------------|
| 1819-1830 | República centralista | Ley Fundamental de 1819 |
| 1863-1886 | Estado federal (Estados Unidos de Colombia) | Rionegro 1863 |
| 1886-1991 | República unitaria centralista | Constitución de 1886 |
| 1991-actual | Estado Social de Derecho descentralizado | Constitución de 1991 |

> **Para recordar:** La forma de Estado no es estática. Colombia ha pasado del centralismo al federalismo y de vuelta al centralismo, hasta llegar al modelo actual de descentralización. Cada cambio refleja las necesidades y los debates políticos de su momento.`
    },
    {
      title: "La Patria Boba y los primeros años de independencia",
      slug: "la-patria-boba",
      description: "Los desafíos políticos de Colombia después de la independencia.",
      content: `## El difícil nacimiento de una república

El 20 de julio de 1810 marcó el inicio del proceso de independencia de Colombia. Sin embargo, la celebración de ese primer grito de libertad no debe hacernos olvidar que los años siguientes fueron un período de profundas divisiones y conflictos internos conocido como la **Patria Boba**.

> **Reflexión:** La independencia no fue un proceso unido y armonioso. Fue un período de intensos debates sobre cómo organizar el nuevo país, debates que en ocasiones derivaron en conflictos armados.

## Centralistas vs. Federalistas

La principal división durante la Patria Boba fue entre dos visiones de organización política:

**Centralistas:**
- Defendían un gobierno central fuerte.
- Buscaban mantener la unidad administrativa heredada de la Colonia.
- Liderados por Antonio Nariño.
- Su lema: "Unidad de la nación".

**Federalistas:**
- Defendían la autonomía de las provincias.
- Buscaban un modelo similar al de Estados Unidos.
- Liderados por Camilo Torres.
- Su lema: "Autonomía regional".

> **¿Sabías que?** Las disputas entre centralistas y federalistas no eran solo ideológicas. También reflejaban intereses económicos regionales: las provincias más ricas querían conservar el control de sus recursos.

## Las consecuencias de la división

Las disputas internas tuvieron graves consecuencias:

1. **Debilitamiento militar:** mientras los patriotas peleaban entre sí, los españoles reorganizaban sus fuerzas.
2. **Desgaste económico:** los conflictos internos consumieron recursos que podrían haberse usado para la guerra de independencia.
3. **Fragmentación política:** las provincias actuaban como Estados independientes, sin coordinación.
4. **Facilidad para la reconquista:** cuando España envió tropas en 1815, encontró un territorio dividido.

## La Reconquista española (1815-1819)

Aprovechando las divisiones internas, el ejército español al mando de Pablo Morillo reconquistó el territorio. La represión fue brutal: líderes independentistas fueron ejecutados, incluyendo a figuras como Policarpa Salavarrieta.

> **Cita destacada:** "La Patria Boba nos enseñó que la división es el peor enemigo de los pueblos que luchan por su libertad."

## Lecciones para el presente

La Patria Boba dejó lecciones que siguen siendo relevantes:
- La independencia política no garantiza la unidad nacional.
- Las diferencias ideológicas son naturales, pero deben canalizarse institucionalmente.
- La construcción del Estado requiere acuerdos básicos sobre las reglas del juego político.

## Reflexión final

A pesar de sus dificultades, la Patria Boba fue un laboratorio político donde se forjaron las primeras ideas sobre la organización del Estado colombiano. Las preguntas que enfrentaron Nariño, Torres y sus contemporáneos —cómo equilibrar unidad y autonomía, cómo distribuir el poder— siguen siendo relevantes en la Colombia de hoy.`
    },
    {
      title: "La Gran Colombia: un proyecto de integración regional",
      slug: "la-gran-colombia",
      description: "El sueño de unión impulsado por Simón Bolívar.",
      content: `## El sueño bolivariano

La Gran Colombia fue uno de los proyectos políticos más ambiciosos de la historia latinoamericana. Creada en 1819 por Simón Bolívar, integró los territorios de la actual Colombia, Venezuela, Ecuador y Panamá en una sola república.

> **Cita destacada:** "La unión de nuestras repúblicas no es una quimera, sino un principio de conservación." — Simón Bolívar

## Los ideales de la unión

Bolívar soñaba con una gran nación capaz de:

- Consolidar la independencia frente a posibles intentos de reconquista.
- Crear un mercado interno fuerte que impulsara el desarrollo económico.
- Proyectar poder en el concierto internacional.
- Evitar las guerras entre las nuevas repúblicas.

> **Conceptos clave:** El proyecto de la Gran Colombia se inspiró en parte en el modelo federal de Estados Unidos, pero con un ejecutivo más fuerte que garantizara la unidad.

## Las tensiones internas

A pesar de sus nobles ideales, la Gran Colombia enfrentó tensiones que terminaron por desintegrarla:

**Tensiones políticas:**
- Bolívar defendía un gobierno centralizado con un presidente vitalicio.
- Francisco de Paula Santander promovía un modelo federal con mayor autonomía regional.

**Tensiones regionales:**
- Venezuela y Ecuador sentían que sus intereses eran ignorados desde Bogotá.
- Las elites regionales querían controlar sus propios recursos.
- Las distancias geográficas dificultaban la administración central.

**Tensiones económicas:**
- La guerra de independencia había devastado la economía.
- No existía un sistema de comunicaciones que conectara eficazmente el territorio.
- Las regiones competían entre sí por recursos escasos.

## La disolución (1830)

En 1830, la Gran Colombia se disolvió formalmente, dando origen a tres repúblicas independientes: Nueva Granada (Colombia), Venezuela y Ecuador. Panamá se separaría más tarde, en 1903.

> **Dato clave:** La Gran Colombia duró apenas 11 años (1819-1830), pero su legado político e ideológico ha perdurado. El ideal de integración latinoamericana sigue vivo en organizaciones como UNASUR, la CELAC y la Comunidad Andina.

## Lecciones de la Gran Colombia

**Lo que funcionó:**
- Demostró que la integración regional era posible, al menos temporalmente.
- Estableció instituciones republicanas en territorios que nunca las habían tenido.
- Creó una identidad compartida que persiste hasta hoy.

**Lo que falló:**
- Subestimó las diferencias regionales.
- No logró construir instituciones suficientemente sólidas.
- Dependió demasiado del liderazgo carismático de Bolívar.

## Reflexión final

Aunque la Gran Colombia fracasó como proyecto político, su legado sigue siendo una inspiración. Nos recuerda que la integración regional es posible, pero requiere instituciones sólidas, acuerdos duraderos y voluntad política para superar las diferencias.`
    },
    {
      title: "De la Constitución de Rionegro a la Regeneración",
      slug: "de-rionegro-a-la-regeneracion",
      description: "Un período de cambios profundos en la organización política colombiana.",
      content: `## El péndulo del poder en el siglo XIX

El siglo XIX colombiano estuvo marcado por un intenso debate entre dos modelos de organización estatal: el federalismo y el centralismo. Este debate se materializó en dos constituciones que representan visiones opuestas del país.

## La Constitución de Rionegro de 1863

Promulgada por los liberales radicales después de su victoria en la Guerra de las Soberanías, esta Constitución estableció un modelo federal extremo:

**Características principales:**

- El país pasó a llamarse **Estados Unidos de Colombia**.
- Cada Estado federado (Antioquia, Boyacá, Cauca, Cundinamarca, Magdalena, Panamá, Santander, Tolima) tenía amplia autonomía.
- El gobierno central tenía poderes muy limitados.
- Se garantizaron amplias libertades individuales.
- Se redujo drásticamente el poder de la Iglesia Católica.

> **Dato clave:** La Constitución de Rionegro redujo el período presidencial a dos años y prohibió la reelección inmediata, buscando evitar la concentración del poder.

**Problemas del modelo federal:**
- Los Estados actuaban como países independientes.
- Las guerras civiles eran constantes (más de 50 en 25 años).
- El gobierno central no tenía recursos para mantener el orden.
- La fragmentación debilitaba al país frente a amenazas externas.

## La Regeneración (1886)

Cansados del caos federal, los conservadores y algunos liberales moderados impulsaron un movimiento conocido como la **Regeneración**, liderado por Rafael Núñez.

> **Cita destacada:** "La Regeneración es el movimiento que buscaba reconstruir el Estado colombiano sobre bases sólidas, después del fracaso del federalismo radical." — Rafael Núñez

**Principios de la Regeneración:**
- Centralismo político y administrativo.
- Fortalecimiento del poder ejecutivo.
- Reconciliación con la Iglesia Católica.
- Orden y estabilidad como prioridades.

## La Constitución de 1886

| Aspecto | Rionegro (1863) | 1886 |
|---------|-----------------|------|
| Modelo | Federal | Unitario |
| Poder ejecutivo | Débil, 2 años | Fuerte, 6 años |
| Iglesia | Separada del Estado | Protegida por el Estado |
| Estados | Autónomos | Departamentos centralizados |
| Libertades | Amplias | Restringidas |

**Consecuencias:**
- Colombia vivió bajo la Constitución de 1886 durante 105 años.
- Se consolidó un Estado centralista y presidencialista.
- La estabilidad política aumentó, pero a costa de limitar libertades.

> **Reflexión:** El paso del federalismo de Rionegro al centralismo de 1886 muestra cómo los extremos generan reacciones. Colombia tardaría más de un siglo en encontrar un equilibrio entre unidad y autonomía con la Constitución de 1991.`
    },
    {
      title: "El Frente Nacional y la búsqueda de estabilidad política",
      slug: "el-frente-nacional",
      description: "Un acuerdo político que marcó varias décadas de la historia colombiana.",
      content: `## Un pacto para terminar la violencia

El Frente Nacional fue uno de los acuerdos políticos más importantes de la historia colombiana. Nació como respuesta a la violencia bipartidista que había sumido al país en una guerra fratricida durante la década de 1950.

> **Reflexión:** El Frente Nacional demostró que, a veces, la paz requiere acuerdos imperfectos entre adversarios.

## Antecedentes: La Violencia (1946-1958)

Colombia vivió uno de los períodos más sangrientos de su historia cuando los partidos Liberal y Conservador se enfrentaron en una guerra no declarada que dejó cientos de miles de muertos.

**Causas de La Violencia:**
- Exclusión política del partido perdedor.
- Odios acumulados entre comunidades.
- Debilidad del Estado para controlar el territorio.
- Uso de la violencia como herramienta política.

## El pacto: ¿en qué consistió?

El Frente Nacional fue un acuerdo entre liberales y conservadores para compartir el poder durante 16 años (1958-1974):

**Mecanismos del acuerdo:**

1. **Alternancia presidencial:** los presidentes se turnarían entre los dos partidos cada cuatro años.
2. **Paridad burocrática:** todos los cargos públicos se distribuirían equitativamente.
3. **Mayoría calificada:** las decisiones importantes requerían mayoría de dos tercios en el Congreso.

> **Dato clave:** Durante el Frente Nacional, las elecciones presidenciales no eran competitivas: el candidato del partido que correspondía gobernar era esencialmente elegido de antemano.

## Logros del Frente Nacional

- **Fin de la violencia bipartidista:** los asesinatos políticos entre liberales y conservadores disminuyeron drásticamente.
- **Estabilidad institucional:** el país experimentó 16 años de alternancia pacífica del poder.
- **Crecimiento económico:** Colombia tuvo tasas de crecimiento sostenidas durante este período.
- **Modernización del Estado:** se crearon instituciones clave como el DANE y el SENA.

## Críticas y limitaciones

- **Exclusión política:** otros movimientos y partidos quedaron fuera del acuerdo.
- **Burocratización:** la paridad generó un Estado clientelista e ineficiente.
- **Gérmen de la insurgencia:** la exclusión política impulsó la creación de guerrillas como las FARC y el ELN.
- **Despolitización:** la ciudadanía perdió interés en una democracia sin competencia real.

> **Ejemplo práctico:** La exclusión política durante el Frente Nacional llevó a muchos ciudadanos a buscar formas alternativas de participación. Algunos se unieron a movimientos cívicos, otros a incipientes grupos guerrilleros. El sistema político cerró las puertas institucionales, y la violencia encontró nuevos cauces.

## Legado

El Frente Nacional terminó formalmente en 1974, pero sus efectos se sintieron durante décadas. La alternancia y la paridad demostraron que la paz entre partidos era posible, pero también mostraron los límites de una democracia sin pluralismo real.

> **Para recordar:** El Frente Nacional nos enseñó que la paz requiere inclusión. Excluir voces del sistema político no las hace desaparecer; las empuja a buscar formas violentas de expresión.`
    },
    {
      title: "La Séptima Papeleta y el nacimiento de la Constitución de 1991",
      slug: "la-septima-papeleta",
      description: "El movimiento ciudadano que impulsó una nueva etapa constitucional.",
      content: `## Cuando los estudiantes cambiaron la historia

A finales de la década de 1980, Colombia vivía una crisis profunda: el narcotráfico desafiaba al Estado, la violencia no cesaba y la Constitución de 1886 ya no respondía a las necesidades del país. En ese contexto, un grupo de estudiantes universitarios impulsó un movimiento que transformaría la historia política de Colombia.

> **Cita destacada:** "Todavía podemos salvar a Colombia." — Lema del movimiento de la Séptima Papeleta

## El contexto: un país al borde del colapso

**La crisis de los 80 en Colombia:**
- Asesinato de líderes políticos (Galán, Pizarro, Jaramillo Ossa).
- Narcotráfico desatado (Pablo Escobar, carteles de Medellín y Cali).
- Toma del Palacio de Justicia (1985).
- Violencia guerrillera sin tregua.
- Constitución de 1886 agotada e incapaz de responder a los desafíos.

## ¿Qué fue la Séptima Papeleta?

En las elecciones de marzo de 1990, los ciudadanos elegían normalmente seis corporaciones públicas. El movimiento estudiantil propuso añadir una séptima papeleta (extracficial) para que los votantes se pronunciaran sobre la convocatoria de una Asamblea Nacional Constituyente.

> **¿Sabías que?** La séptima papeleta no tenía validez jurídica oficial. Era un voto simbólico que los estudiantes imprimieron y distribuyeron por su cuenta. Más de 2 millones de colombianos la depositaron en las urnas.

**El efecto fue arrollador:**
- La ciudadanía apoyó masivamente la iniciativa.
- La Corte Suprema de Justicia avaló el proceso.
- El gobierno de Virgilio Barco convocó la Asamblea Constituyente.
- En diciembre de 1990, los colombianos eligieron a los constituyentes.

## La Asamblea Nacional Constituyente (1991)

La Asamblea estuvo compuesta por 70 delegados de diversos sectores políticos y sociales, incluyendo:
- Miembros de los partidos Liberal y Conservador.
- La Alianza Democrática M-19 (exguerrilleros desmovilizados).
- Movimientos indígenas y minorías.
- Sectores académicos y sociales.

**Resultado:** el 4 de julio de 1991 se promulgó la nueva Constitución Política de Colombia.

## Logros de la Constitución de 1991

1. **Estado Social de Derecho:** el Estado debe garantizar condiciones de vida digna.
2. **Derechos fundamentales:** catálogo amplio con mecanismos de protección como la tutela.
3. **Participación ciudadana:** mecanismos como el referendo, la consulta popular y la revocatoria del mandato.
4. **Pluralismo:** reconocimiento de la diversidad étnica y cultural.
5. **Descentralización:** mayor autonomía para regiones y municipios.
6. **Corte Constitucional:** creada para velar por la supremacía constitucional.

## Reflexión final

La Séptima Papeleta demostró que la ciudadanía organizada puede transformar el curso de la historia. Un pequeño grupo de estudiantes universitarios logró lo que parecía imposible: cambiar la Constitución de un país por la vía pacífica y democrática. Es un recordatorio de que la participación ciudadana no es un concepto abstracto, sino una herramienta real de cambio.`
    },
    {
      title: "La estructura actual del Estado colombiano",
      slug: "estructura-actual-del-estado-colombiano",
      description: "Cómo está organizado el Estado según la Constitución de 1991.",
      content: `## La arquitectura institucional de Colombia

La Constitución de 1991 estableció una estructura estatal diseñada para garantizar el equilibrio de poderes, la participación ciudadana y la protección de derechos. Conocer esta estructura es fundamental para entender cómo funciona el Estado colombiano.

> **Reflexión:** La estructura del Estado no es un organigrama aburrido. Es el mapa de cómo se toman las decisiones que afectan nuestra vida cotidiana.

## Los componentes esenciales

### Las tres ramas del poder público

| Rama | Función | Principal institución |
|------|---------|----------------------|
| Ejecutiva | Administrar el Estado y ejecutar políticas | Presidencia de la República |
| Legislativa | Crear leyes y controlar al gobierno | Congreso de la República |
| Judicial | Resolver conflictos y aplicar justicia | Corte Suprema, Corte Constitucional, Consejo de Estado |

### Los organismos de control

- **Procuraduría General de la Nación:** vigila la conducta de los servidores públicos.
- **Contraloría General de la República:** controla la gestión fiscal del Estado.
- **Defensoría del Pueblo:** protege los derechos humanos de los ciudadanos.

### Las entidades autónomas

- **Banco de la República:** maneja la política monetaria y cambiaria.
- **Comisión Nacional del Servicio Civil:** administra el sistema de mérito en el empleo público.
- **Autoridades regulatorias:** regulan sectores como energía, comunicaciones y salud.

## Organización territorial

Colombia se organiza territorialmente en:

1. **Nación** (gobierno central)
2. **Departamentos** (32 más Bogotá como Distrito Capital)
3. **Municipios** (más de 1.100)
4. **Regiones** (asociaciones voluntarias de departamentos)
5. **Territorios indígenas** (entidades territoriales especiales)

> **Dato clave:** La descentralización territorial fue una de las grandes innovaciones de la Constitución de 1991. Los departamentos y municipios eligieron por primera vez a sus propios gobernadores y alcaldes, rompiendo con siglos de centralismo.

## Mecanismos de participación ciudadana

La Constitución de 1991 no solo organizó el poder, sino que creó canales para que los ciudadanos incidan en las decisiones públicas:

- **Voto popular:** para elegir gobernantes y representantes.
- **Referendo:** para aprobar o rechazar decisiones importantes.
- **Consulta popular:** para decidir sobre asuntos de interés local.
- **Cabildo abierto:** espacio de discusión entre ciudadanos y autoridades.
- **Iniciativa legislativa:** los ciudadanos pueden proponer leyes.
- **Revocatoria del mandato:** para destituir a funcionarios electos.

## Para recordar

La estructura del Estado colombiano fue diseñada para evitar la concentración del poder y garantizar la participación de los ciudadanos. Cada persona tiene un lugar en esta estructura: no solo como votante, sino como vigilante, participante y constructor de lo público.`
    },
    {
      title: "Las ramas del poder público y sus funciones",
      slug: "ramas-del-poder-publico",
      description: "El papel de cada una de las ramas en el funcionamiento del Estado.",
      content: `## El equilibrio del poder

La separación de poderes es uno de los pilares fundamentales del constitucionalismo moderno. En Colombia, la Constitución de 1991 estableció tres ramas del poder público que funcionan de manera independiente pero coordinada.

> **Cita destacada:** "Para que no se pueda abusar del poder, es preciso que el poder detenga al poder." — Montesquieu

## Rama Ejecutiva

**Función principal:** administrar el Estado y ejecutar las políticas públicas.

**Composición:**
- **Presidente de la República:** jefe de Estado y de gobierno, elegido para un período de 4 años.
- **Vicepresidente:** acompaña al presidente en sus funciones.
- **Ministros y directores de departamentos administrativos:** definen las políticas sectoriales.
- **Gobernadores y alcaldes:** autoridades ejecutivas a nivel departamental y municipal.

**Funciones clave:**
- Sancionar y promulgar leyes.
- Dirigir las relaciones internacionales.
- Mantener el orden público.
- Administrar la hacienda pública.
- Nombrar a altos funcionarios del Estado.

> **¿Sabías que?** El presidente colombiano tiene la facultad de declarar estados de excepción (conmoción interior, emergencia económica) cuando circunstancias graves lo requieren, aunque con control posterior de la Corte Constitucional.

## Rama Legislativa

**Función principal:** elaborar las leyes y ejercer control político sobre el gobierno.

**Composición:**
- **Congreso de la República** (bicameral):
  - **Senado:** 108 miembros elegidos por circunscripción nacional.
  - **Cámara de Representantes:** 188 miembros elegidos por circunscripciones territoriales y especiales.

**Funciones clave:**
- Crear, modificar y derogar leyes.
- Aprobar el presupuesto nacional.
- Ejercer control político (mociones de censura, debates).
- Reformar la Constitución.
- Elegir a altos funcionarios (Procurador, Contralor, etc.).

## Rama Judicial

**Función principal:** administrar justicia y resolver conflictos.

**Composición:**
- **Corte Suprema de Justicia:** máxima instancia en materia penal, civil y laboral.
- **Corte Constitucional:** guardiana de la Constitución.
- **Consejo de Estado:** máxima instancia en materia contencioso-administrativa.
- **Jurisdicción Especial para la Paz (JEP):** justicia transicional para el conflicto armado.
- **Consejo Superior de la Judicatura:** administra la rama judicial.

> **Dato clave:** La Corte Constitucional colombiana tiene la facultad de revisar cualquier ley o decreto para determinar si es conforme a la Constitución. Esta función de control constitucional es una de las más amplias del mundo.

## El principio de colaboración armónica

Aunque las ramas son independientes, están obligadas a colaborar entre sí para el buen funcionamiento del Estado. Por ejemplo:

- El Ejecutivo sanciona las leyes aprobadas por el Legislativo.
- El Judicial puede declarar inconstitucionales las leyes aprobadas por el Legislativo y sancionadas por el Ejecutivo.
- El Legislativo controla políticamente al Ejecutivo.

> **Para recordar:** La separación de poderes no es un fin en sí misma. Es un medio para proteger la libertad de los ciudadanos y evitar la concentración del poder que lleva al autoritarismo.`
    },
    {
      title: "El Estado Social de Derecho en la práctica",
      slug: "estado-social-de-derecho-en-la-practica",
      description: "Cómo se materializa este principio constitucional en la vida cotidiana.",
      content: `## Del papel a la realidad

La Constitución de 1991 definió a Colombia como un Estado Social de Derecho. Pero, ¿cómo se traduce este principio en la vida cotidiana de los ciudadanos? ¿Qué significa realmente que el Estado deba garantizar condiciones de vida digna?

> **Reflexión:** El Estado Social de Derecho no es solo un concepto jurídico. Es un compromiso que se materializa cada vez que un ciudadano accede a salud, educación o justicia.

## ¿Qué implica en la práctica?

**1. Obligaciones positivas del Estado**

A diferencia del Estado liberal clásico, que solo debía abstenerse de interferir en las libertades individuales, el Estado Social de Derecho debe actuar activamente:

- Garantizar el acceso a la salud para todos.
- Proveer educación pública gratuita y de calidad.
- Implementar políticas de vivienda digna.
- Generar condiciones para el trabajo decente.
- Proteger a poblaciones vulnerables.

> **Ejemplo práctico:** Cuando el ICBF garantiza el bienestar de los niños en situación de riesgo, o cuando una EPS debe autorizar un tratamiento médico costoso, están actuando bajo el principio del Estado Social de Derecho.

**2. La acción de tutela**

Es el mecanismo más poderoso que tienen los ciudadanos para exigir el cumplimiento del Estado Social de Derecho. Cualquier persona puede acudir ante un juez para solicitar la protección inmediata de sus derechos fundamentales.

**Datos sobre la tutela en Colombia:**
- Más de 600.000 tutelas se presentan cada año.
- El derecho más invocado es el derecho a la salud.
- La mayoría de las tutelas son falladas a favor del ciudadano.
- Ha sido un mecanismo clave para hacer efectivos los derechos sociales.

> **¿Sabías que?** La acción de tutela colombiana ha sido reconocida internacionalmente como uno de los mecanismos de protección de derechos más efectivos del mundo. Ha inspirado sistemas similares en otros países.

**3. Políticas públicas con enfoque social**

El Estado Social de Derecho se materializa a través de políticas públicas como:

| Política | Objetivo | Resultados |
|----------|----------|------------|
| Colombia Mayor | Proteger al adulto mayor en situación de pobreza | Más de 1.5 millones de beneficiarios |
| Familias en Acción | Apoyar a familias en condición de pobreza | Cobertura nacional con condicionalidades en salud y educación |
| Matrícula Cero | Gratuidad en educación superior pública | Más de 700.000 estudiantes beneficiados |

## Desafíos en la implementación

A pesar de los avances, la implementación del Estado Social de Derecho enfrenta obstáculos:

- **Recursos limitados:** las necesidades sociales superan la capacidad fiscal del Estado.
- **Burocracia:** la lentitud administrativa dificulta la entrega oportuna de servicios.
- **Corrupción:** desvía recursos destinados a programas sociales.
- **Desigualdad regional:** la presencia del Estado es más débil en zonas rurales y apartadas.

## Para recordar

El Estado Social de Derecho no es una promesa vacía. Es un principio constitucional que obliga al Estado a trabajar todos los días para garantizar condiciones de vida digna. Como ciudadanos, podemos exigir su cumplimiento a través de mecanismos como la tutela, la participación y el control social.`
    },
    {
      title: "Los desafíos actuales del Estado colombiano",
      slug: "desafios-actuales-del-estado-colombiano",
      description: "Retos institucionales, sociales y económicos del país.",
      content: `## Un Estado en evolución

El Estado colombiano ha recorrido un largo camino desde su fundación en el siglo XIX. Sin embargo, enfrenta desafíos profundos que ponen a prueba su capacidad de responder a las necesidades de la sociedad del siglo XXI.

> **Reflexión:** Los desafíos del Estado no son fracasos, sino oportunidades para repensar y fortalecer las instituciones.

## 1. La consolidación de la paz

La implementación del Acuerdo de Paz de 2016 sigue siendo uno de los mayores desafíos del Estado colombiano:

- **Seguridad en territorios:** grupos armados continúan disputando el control de regiones enteras.
- **Sustitución de cultivos ilícitos:** el Estado debe ofrecer alternativas económicas viables.
- **Protección de líderes sociales:** los asesinatos de defensores de derechos humanos son una mancha en la democracia.
- **Reincorporación:** el Estado debe garantizar la reintegración de excombatientes a la vida civil.

> **Dato clave:** Según Naciones Unidas, más de 1.200 líderes sociales han sido asesinados en Colombia desde la firma del Acuerdo de Paz, lo que evidencia la deuda del Estado con la protección de quienes trabajan por la paz.

## 2. La lucha contra la corrupción

La corrupción es percibida como uno de los problemas más graves del país. Sus efectos son devastadores:

- **Económicos:** se estima que la corrupción le cuesta al país entre 30 y 50 billones de pesos anuales.
- **Sociales:** los recursos desviados dejan de financiar salud, educación e infraestructura.
- **Institucionales:** erosiona la confianza de los ciudadanos en el Estado.

## 3. La desigualdad y la inclusión social

Colombia sigue siendo uno de los países más desiguales del mundo:

- El 10% más rico gana 12 veces más que el 10% más pobre.
- La informalidad laboral afecta a más del 55% de los trabajadores.
- La pobreza rural duplica la pobreza urbana.
- El acceso a educación superior sigue siendo un privilegio.

> **Ejemplo práctico:** Un niño nacido en un municipio rural del Chocó tiene expectativas de vida y oportunidades radicalmente diferentes a las de un niño nacido en Bogotá. El Estado debe trabajar para cerrar estas brechas.

## 4. La transformación digital del Estado

La digitalización ofrece oportunidades enormes pero también desafíos:

- **Gobierno digital:** trámites en línea, datos abiertos, servicios digitales.
- **Brecha digital:** millones de colombianos no tienen acceso a internet.
- **Ciberseguridad:** protección de datos y sistemas frente a ataques.
- **Talento digital:** el Estado necesita funcionarios capacitados en tecnologías.

## 5. La crisis climática y la transición energética

Colombia es especialmente vulnerable al cambio climático:

- Sequías e inundaciones afectan la producción agrícola.
- La deforestación avanza en la Amazonía.
- La transición a energías limpias requiere inversiones masivas.
- Los municipios costeros enfrentan el aumento del nivel del mar.

## 6. La confianza ciudadana

Quizás el desafío más profundo: recuperar la confianza de los ciudadanos en sus instituciones. Sin confianza, las políticas públicas no funcionan, los impuestos no se pagan voluntariamente y la democracia se debilita.

> **Para recordar:** El Estado colombiano ha demostrado una notable capacidad de adaptación a lo largo de su historia. Superó la Patria Boba, la violencia bipartidista, el narcotráfico y el conflicto armado. Los desafíos actuales son grandes, pero también lo son las herramientas institucionales y la voluntad ciudadana para enfrentarlos.`
    }
  ];

  for (const article of articles) {
    await createArticle(token, article.title, article.slug, article.description, article.content);
  }
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN ESTADO');
}

main().catch(console.error);
