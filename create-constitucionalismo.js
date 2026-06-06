const http = require('http');

const HOST = 'localhost';
const PORT = 1337;
const CATEGORY_ID = 1;
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
  console.log('Token obtenido. Creando artículos de Constitucionalismo...\n');

  const articles = [
    {
      title: "¿Qué es el constitucionalismo y por qué sigue siendo importante?",
      slug: "que-es-el-constitucionalismo",
      description: "Una introducción al constitucionalismo y su papel en la organización de los Estados modernos.",
      content: `## Introducción

El constitucionalismo es una de las ideas más poderosas y duraderas de la historia política. En esencia, es la creencia de que el poder político debe estar limitado por un conjunto de normas superiores —una Constitución— que nadie, ni siquiera el gobernante más poderoso, puede ignorar.

> **Reflexión:** El constitucionalismo no es solo un conjunto de reglas escritas. Es una cultura política que afirma que nadie está por encima de la ley.

## ¿Por qué sigue siendo importante?

En un mundo donde surgen constantemente nuevos desafíos —desde la inteligencia artificial hasta las crisis climáticas— el constitucionalismo ofrece herramientas esenciales:

- **Limita el poder:** impide que la autoridad actúe de manera arbitraria.
- **Protege derechos:** garantiza libertades fundamentales frente a mayorías ocasionales.
- **Da estabilidad:** crea un marco predecible para la convivencia social.
- **Legitima el gobierno:** el poder solo es legítimo cuando se ejerce dentro de los cauces constitucionales.

**¿Qué pasaría sin constitucionalismo?**
Sin estos límites, el poder tendería a concentrarse, los derechos serían frágiles y la democracia se debilitaría. La historia está llena de ejemplos de países donde la ausencia de una cultura constitucional permitió abusos autoritarios.

> **Dato clave:** Más del 90% de los países del mundo tienen una Constitución escrita. Sin embargo, tener una Constitución no es lo mismo que vivir bajo un auténtico constitucionalismo. La diferencia está en si realmente se respetan sus límites.

## El constitucionalismo en la vida cotidiana

Puede que el constitucionalismo parezca un tema abstracto, pero sus efectos son muy concretos:

- Cuando un juez ordena respetar el debido proceso, está aplicando principios constitucionales.
- Cuando una ley es declarada inconstitucional, se está protegiendo la supremacía de la Constitución.
- Cuando un ciudadano exige sus derechos ante una autoridad, está ejerciendo el constitucionalismo.

## Reflexión final

El constitucionalismo no es un lujo académico ni una idea del pasado. Es una conquista civilizatoria que debemos cuidar y fortalecer. En tiempos de incertidumbre, recordar que el poder tiene límites y que los derechos son inviolables sigue siendo la mejor garantía de una sociedad libre y justa.`
    },
    {
      title: "Los orígenes históricos del constitucionalismo",
      slug: "origenes-historicos-del-constitucionalismo",
      description: "Un recorrido por los acontecimientos históricos que dieron origen al constitucionalismo.",
      content: `## Un viaje por la historia del poder limitado

El constitucionalismo no nació de la noche a la mañana. Fue el resultado de siglos de luchas, reflexiones y acontecimientos que poco a poco fueron construyendo la idea de que el poder político debe tener límites.

## Línea de tiempo: hitos del constitucionalismo

| Año | Acontecimiento | Aporte |
|-----|----------------|--------|
| 1215 | Carta Magna (Inglaterra) | Primer documento que limitó el poder real |
| 1689 | Declaración de Derechos (Inglaterra) | Estableció derechos del Parlamento frente al rey |
| 1776 | Declaración de Independencia (EE.UU.) | Proclamó derechos inalienables del ciudadano |
| 1787 | Constitución de EE.UU. | Primera Constitución nacional escrita |
| 1789 | Declaración de los Derechos del Hombre (Francia) | Inspiró el constitucionalismo europeo |
| 1812 | Constitución de Cádiz | Primera Constitución española, influyó en América Latina |
| 1991 | Constitución de Colombia | Consagró un Estado Social de Derecho |

## Las revoluciones que cambiaron todo

### La Revolución Estadounidense (1776)
Trece colonias británicas declararon su independencia basándose en la idea de que los gobiernos deben garantizar los derechos de los gobernados. La Constitución de 1787 estableció un sistema de separación de poderes y controles mutuos que sigue siendo un modelo global.

### La Revolución Francesa (1789)
Francia llevó el constitucionalismo a Europa con su Declaración de los Derechos del Hombre y del Ciudadano, proclamando que "toda sociedad en la que no esté asegurada la garantía de los derechos ni determinada la separación de poderes, carece de Constitución".

> **¿Sabías que?** La Declaración Francesa de 1789 inspiró directamente las constituciones de muchos países latinoamericanos durante el siglo XIX, incluyendo las primeras constituciones colombianas.

## El legado para América Latina

En América Latina, el constitucionalismo llegó de la mano de los procesos de independencia. Las nuevas repúblicas adoptaron constituciones escritas como una forma de romper con el pasado colonial y construir Estados modernos. Sin embargo, la tensión entre el texto constitucional y la realidad política ha sido una constante en la región.

> **Reflexión:** Conocer la historia del constitucionalismo nos ayuda a entender que las conquistas actuales —como el voto popular, la separación de poderes o los derechos fundamentales— no fueron regalos, sino conquistas que costaron siglos de esfuerzo.`
    },
    {
      title: "El pensamiento medieval y las primeras limitaciones al poder",
      slug: "pensamiento-medieval-limitaciones-al-poder",
      description: "La influencia del pensamiento medieval en el desarrollo del constitucionalismo.",
      content: `## Raíces medievales de un concepto moderno

Antes de que existieran las constituciones modernas, ya existía la idea de que el poder no podía ser absoluto. Durante la Edad Media, diversas corrientes de pensamiento comenzaron a cuestionar la autoridad ilimitada de los gobernantes.

> **Cita destacada:** "El rey está bajo Dios y bajo la ley, porque la ley hace al rey." — Henry de Bracton, jurista inglés del siglo XIII

## La Carta Magna de 1215

El antecedente más conocido del constitucionalismo medieval es la Carta Magna, firmada por el rey Juan sin Tierra de Inglaterra. Este documento estableció por primera vez que el monarca no podía actuar de manera arbitraria:

- **Impuestos:** el rey no podía crear nuevos impuestos sin el consentimiento del consejo.
- **Justicia:** nadie podía ser encarcelado sin un juicio justo.
- **Límites:** la autoridad real estaba sujeta a la ley.

> **Conceptos clave:** La Carta Magna introdujo el principio de *due process of law* (debido proceso legal), que hoy es un pilar del constitucionalismo en todo el mundo.

## El pensamiento escolástico y el bien común

Los filósofos escolásticos, como Santo Tomás de Aquino (1225-1274), desarrollaron la idea de que el poder político debía orientarse al bien común. Si un gobernante actuaba en contra del bien común, perdía legitimidad.

**Ideas clave del pensamiento escolástico:**

- La ley humana debe ser conforme a la ley natural.
- El gobernante no es un propietario del poder, sino un administrador.
- La comunidad tiene derecho a resistir frente a la tiranía.
- El poder supremo no es el gobernante, sino la ley.

## El papel de la Iglesia y las instituciones

La Iglesia medieval, con su estructura jerárquica y su influencia política, también contribuyó a limitar el poder de los monarcas. Aunque esta relación fue compleja y no estuvo exenta de conflictos, generó la idea de que existían autoridades capaces de juzgar e incluso destituir a un rey.

## Para recordar

El pensamiento medieval nos legó una idea revolucionaria: **el poder no es un fin en sí mismo, sino un medio al servicio del bien común.** Esta idea, que hoy parece obvia, fue una conquista intelectual que allanó el camino para el constitucionalismo moderno.`
    },
    {
      title: "La Ilustración y el nacimiento del constitucionalismo moderno",
      slug: "ilustracion-nacimiento-constitucionalismo-moderno",
      description: "Cómo las ideas ilustradas transformaron la organización política de los Estados.",
      content: `## El siglo de las luces y la política

El siglo XVIII fue testigo de una revolución intelectual que transformó para siempre la forma de entender el poder, los derechos y la organización del Estado. La Ilustración puso al ser humano y su razón en el centro del universo político.

> **Cita destacada:** "La libertad es el derecho de hacer todo lo que las leyes permitan." — Montesquieu, *Del espíritu de las leyes*

## Los grandes pensadores y sus aportes

### Montesquieu (1689-1755) y la separación de poderes
En su obra *Del espíritu de las leyes*, propuso dividir el poder del Estado en tres ramas independientes: legislativa, ejecutiva y judicial. Esta división evita la concentración del poder y protege la libertad.

**El modelo de Montesquieu:**

- **Poder legislativo:** crea las leyes (Parlamento).
- **Poder ejecutivo:** ejecuta las leyes (Gobierno).
- **Poder judicial:** interpreta las leyes y juzga su aplicación (Tribunales).

### Jean-Jacques Rousseau (1712-1778) y la soberanía popular
Rousseau sostuvo que la soberanía reside en el pueblo. El gobierno solo es legítimo cuando expresa la voluntad general de los ciudadanos. Su obra *El contrato social* inspiró movimientos democráticos en todo el mundo.

### John Locke (1632-1704) y los derechos naturales
Locke argumentó que todos los seres humanos poseen derechos naturales (vida, libertad y propiedad) que el Estado debe proteger. Si el gobierno viola estos derechos, el pueblo tiene derecho a rebelarse.

> **¿Sabías que?** La Declaración de Independencia de Estados Unidos (1776) está directamente inspirada en las ideas de John Locke. Cuando Thomas Jefferson escribió "vida, libertad y búsqueda de la felicidad", estaba parafraseando a Locke.

## Cómo estas ideas llegaron a las constituciones

Las ideas ilustradas no se quedaron en los libros. Se convirtieron en el fundamento de las primeras constituciones modernas:

**Constitución de Estados Unidos (1787)**
- Incorporó la separación de poderes de Montesquieu.
- Estableció un sistema de frenos y contrapesos (*checks and balances*).
- Incluyó una declaración de derechos (las primeras 10 enmiendas).

**Constitución francesa de 1791**
- Abolió el absolutismo monárquico.
- Consagró la soberanía nacional.
- Declaró los derechos del hombre y del ciudadano.

## El impacto en Colombia

La influencia de la Ilustración llegó a Colombia a través de la traducción de obras filosóficas y el intercambio intelectual con Europa. Los próceres de la independencia, como Nariño y Torres, estaban familiarizados con las ideas ilustradas. La Constitución de 1991, aunque mucho más reciente, recoge estos principios: soberanía popular, separación de poderes y protección de derechos fundamentales.

> **Reflexión:** La Ilustración nos enseñó que el poder no viene de Dios ni de la fuerza, sino de la voluntad de los ciudadanos expresada en una Constitución. Esa sigue siendo la base de nuestras democracias.`
    },
    {
      title: "Principios fundamentales del constitucionalismo",
      slug: "principios-fundamentales-del-constitucionalismo",
      description: "Los pilares que sostienen los sistemas constitucionales modernos.",
      content: `## Los cimientos del Estado constitucional

El constitucionalismo se sostiene sobre principios fundamentales que garantizan que el poder esté limitado y los derechos protegidos. Conocerlos es esencial para entender cómo funciona un Estado democrático.

## 1. Supremacía constitucional

La Constitución es la norma suprema del ordenamiento jurídico. Ninguna ley, decreto o acto del gobierno puede estar por encima de ella.

**¿Qué implica?**
- Todas las leyes deben ser conformes a la Constitución.
- Existen mecanismos de control constitucional (como la Corte Constitucional en Colombia).
- Los ciudadanos pueden exigir que se respete la Constitución.

> **Ejemplo práctico:** En Colombia, cuando una ley contradice la Constitución, cualquier ciudadano puede interponer una acción de inconstitucionalidad ante la Corte Constitucional para que la declare nula.

## 2. Separación de poderes

El poder del Estado se divide en tres ramas independientes que se controlan mutuamente.

| Rama | Función | Controla a |
|------|---------|------------|
| Legislativa | Crear leyes | Ejecutivo (moción de censura) |
| Ejecutiva | Gobernar y administrar | Legislativo (control político) |
| Judicial | Juzgar y hacer cumplir la ley | Ambos (control constitucional) |

## 3. Protección de derechos fundamentales

El constitucionalismo reconoce que existen derechos inherentes a la persona que el Estado debe respetar y garantizar.

**Derechos fundamentales típicos:**

- Derecho a la vida y a la integridad personal.
- Libertad de expresión, conciencia y religión.
- Derecho al debido proceso y defensa.
- Derecho a la igualdad y no discriminación.
- Derecho a la participación política.

> **Conceptos clave:** Los derechos fundamentales no son concesiones del Estado, sino límites que el Estado debe respetar. Por eso se llaman "fundamentales": porque son anteriores y superiores al poder público.

## 4. Control y responsabilidad del poder

Todo ejercicio de poder público debe estar sujeto a control y rendición de cuentas. Ningún funcionario está exento de responsabilidad.

**Mecanismos de control:**

- **Control político:** el Congreso fiscaliza al Ejecutivo.
- **Control judicial:** los tribunales revisan la legalidad de los actos públicos.
- **Control social:** los ciudadanos pueden vigilar la gestión pública (veedurías).
- **Control disciplinario:** las autoridades sancionan a funcionarios corruptos.

## 5. Participación ciudadana

El constitucionalismo democrático reconoce que los ciudadanos no son solo destinatarios del poder, sino protagonistas de la vida pública.

## Para recordar

Estos principios no son teoría abstracta. Son herramientas concretas que protegen a los ciudadanos y garantizan que el poder político sirva al bien común. Conocerlos es el primer paso para ejercer una ciudadanía activa y responsable.`
    },
    {
      title: "La evolución de los derechos fundamentales",
      slug: "evolucion-de-los-derechos-fundamentales",
      description: "Cómo los derechos fundamentales se han ampliado a lo largo de la historia.",
      content: `## De los derechos civiles a los derechos digitales

Los derechos fundamentales no son estáticos. Han evolucionado a lo largo de los siglos para responder a las nuevas necesidades y desafíos de cada época. Esta evolución refleja el progreso de la humanidad en su búsqueda de libertad, igualdad y dignidad.

## Las tres generaciones de derechos

**Primera generación: derechos civiles y políticos (siglo XVIII)**
Surgen con las revoluciones liberales y buscan proteger al individuo frente al Estado.

- Derecho a la vida, libertad y seguridad.
- Libertad de expresión, prensa y religión.
- Derecho al voto y a la participación política.
- Derecho a la propiedad privada.

**Segunda generación: derechos económicos, sociales y culturales (siglo XIX-XX)**
Aparecen con las luchas obreras y sociales, y exigen una acción positiva del Estado.

- Derecho al trabajo y a condiciones laborales justas.
- Derecho a la educación y la salud.
- Derecho a la seguridad social.
- Derecho a la vivienda digna.

> **¿Sabías que?** La Constitución colombiana de 1991 incluye derechos de primera y segunda generación, y además reconoce derechos de la tercera generación como el derecho a un ambiente sano y los derechos de los pueblos indígenas.

**Tercera generación: derechos de solidaridad (siglo XX-XXI)**
Responden a desafíos globales y requieren cooperación internacional.

- Derecho al desarrollo sostenible.
- Derecho a la paz.
- Derecho a un medio ambiente saludable.
- Derechos digitales y acceso a la tecnología.

## El caso colombiano: una Constitución de vanguardia

La Constitución de 1991 fue pionera en América Latina por:

1. Incorporar un amplio catálogo de derechos fundamentales.
2. Crear la acción de tutela, un mecanismo rápido para proteger derechos.
3. Reconocer la diversidad étnica y cultural de la nación.
4. Establecer el Estado Social de Derecho como modelo.

> **Dato clave:** La acción de tutela colombiana ha sido tan exitosa que ha inspirado mecanismos similares en otros países de la región. Cualquier ciudadano puede usarla para proteger sus derechos fundamentales de manera inmediata.

## Los derechos del futuro

La evolución continúa. Hoy se discuten nuevos derechos:

- Derecho a la privacidad digital.
- Derecho a no ser discriminado por algoritmos.
- Derechos de la naturaleza y los ecosistemas.
- Derecho a la desconexión laboral.

## Reflexión final

La historia de los derechos fundamentales es la historia de la humanidad luchando por ampliar los límites de la libertad y la dignidad. Cada generación tiene la tarea de proteger los derechos conquistados y luchar por los que aún faltan.`
    },
    {
      title: "Modelos de constitucionalismo en el mundo",
      slug: "modelos-de-constitucionalismo-en-el-mundo",
      description: "Una mirada a las diferentes formas de organización constitucional.",
      content: `## Un mundo de constituciones

No existe un único modelo de constitucionalismo. Cada país ha desarrollado su propio sistema constitucional según su historia, cultura y tradición jurídica. Comparar estos modelos nos ayuda a entender las fortalezas y debilidades de cada enfoque.

## Los grandes modelos

### Modelo estadounidense
- Constitución escrita y rígida (1787), la más antigua del mundo.
- Control judicial difuso: cualquier juez puede declarar inconstitucional una ley.
- Sistema presidencialista con fuerte separación de poderes.
- Énfasis en libertades individuales y límites al gobierno federal.

### Modelo europeo-continental
- Constituciones escritas con tribunales constitucionales especializados.
- Control concentrado: solo el tribunal constitucional puede anular leyes.
- Sistemas parlamentarios o semipresidencialistas.
- Mayor énfasis en derechos sociales y Estado de bienestar.

### Modelo británico
- No tiene una Constitución escrita en un solo documento.
- Se basa en leyes ordinarias, costumbres y convenciones.
- Principio de soberanía parlamentaria: el Parlamento es supremo.
- Evolución gradual y flexible del sistema constitucional.

> **Conceptos clave:** La diferencia entre Constitución escrita y no escrita no es solo formal. Una Constitución escrita ofrece mayor certeza y protección, mientras que una no escrita permite mayor flexibilidad y adaptación.

## Modelos en América Latina

América Latina ha desarrollado un constitucionalismo propio con características particulares:

**Constitución mexicana de 1917**
Primera Constitución en el mundo en incluir derechos sociales (trabajo, educación, salud).

**Constitución brasileña de 1988**
Extensa y detallada, con un amplio catálogo de derechos. Conocida como "Constitución Ciudadana".

**Constitución colombiana de 1991**
Reconocida por su avanzada protección de derechos, su sistema de tutela y su reconocimiento de la diversidad cultural.

## Características compartidas del constitucionalismo latinoamericano

1. Constituciones extensas y detalladas.
2. Amplios catálogos de derechos fundamentales.
3. Sistemas de control constitucional concentrado.
4. Reconocimiento del pluralismo jurídico (derecho indígena).
5. Mecanismos de participación ciudadana directa.

## Para recordar

Cada modelo responde a las necesidades específicas de su sociedad. No existe un modelo perfecto, pero todos comparten el objetivo fundamental del constitucionalismo: limitar el poder y proteger los derechos. La riqueza del constitucionalismo está en su diversidad.`
    },
    {
      title: "El constitucionalismo en América Latina",
      slug: "constitucionalismo-en-america-latina",
      description: "Características y desafíos del constitucionalismo latinoamericano.",
      content: `## Un constitucionalismo con identidad propia

América Latina ha desarrollado una tradición constitucional rica y original, marcada por la búsqueda de estabilidad política, inclusión social y reconocimiento de su diversidad cultural. Sin embargo, también enfrenta desafíos profundos que ponen a prueba sus instituciones.

## Las etapas del constitucionalismo latinoamericano

**Primera etapa: constitucionalismo fundacional (1810-1850)**
Tras la independencia, las nuevas repúblicas adoptaron constituciones inspiradas en los modelos estadounidense y francés. Sin embargo, la inestabilidad política dificultó su implementación.

**Segunda etapa: constitucionalismo social (1917-1970)**
Inspirado por la Constitución mexicana de 1917, este periodo incorporó derechos laborales, educativos y de seguridad social. Fue una respuesta a las demandas de justicia social.

**Tercera etapa: constitucionalismo democrático (1980-presente)**
Con el fin de las dictaduras, varios países adoptaron nuevas constituciones que buscaban fortalecer la democracia, proteger derechos humanos y reconocer la diversidad cultural.

> **Dato clave:** Entre 1978 y 2018, más de 20 países latinoamericanos adoptaron nuevas constituciones o realizaron reformas profundas, en un proceso conocido como el "nuevo constitucionalismo latinoamericano".

## Características distintivas

- **Constituciones extensas y detalladas** que regulan aspectos sociales, económicos y culturales.
- **Mecanismos de participación ciudadana** como referendos, consultas populares e iniciativas legislativas.
- **Reconocimiento del pluralismo jurídico** y los derechos de los pueblos indígenas.
- **Sistemas de control constitucional** concentrados en tribunales especializados.
- **Inclusión de derechos de tercera generación:** medio ambiente, paz, desarrollo.

## Desafíos actuales

1. **Desigualdad:** a pesar de los avances constitucionales, América Latina sigue siendo la región más desigual del mundo.
2. **Corrupción:** debilita la confianza en las instituciones y erosiona el Estado de Derecho.
3. **Inestabilidad política:** crisis institucionales recurrentes en varios países.
4. **Implementación:** existe una brecha entre lo que dicen las constituciones y la realidad cotidiana.
5. **Seguridad ciudadana:** el crimen organizado y la violencia desafían la capacidad del Estado.

> **Reflexión:** El constitucionalismo latinoamericano ha demostrado una notable capacidad de innovación, pero enfrenta el reto de pasar del texto a la realidad. La región sigue buscando el equilibrio entre constituciones ambiciosas y capacidades institucionales efectivas.

## El camino a seguir

Fortalecer el constitucionalismo en América Latina requiere:

- Mayor independencia judicial.
- Mecanismos efectivos de rendición de cuentas.
- Participación ciudadana informada y activa.
- Reducción de la desigualdad económica y social.
- Defensa de los derechos frente a amenazas autoritarias.`
    },
    {
      title: "El Estado Social de Derecho en Colombia",
      slug: "estado-social-de-derecho-en-colombia",
      description: "Uno de los conceptos más importantes de la Constitución de 1991.",
      content: `## El corazón de la Constitución de 1991

La Constitución Política de Colombia de 1991 definió al país como un **Estado Social de Derecho**, una fórmula que transformó profundamente la relación entre el Estado y los ciudadanos. Pero, ¿qué significa exactamente este concepto?

> **Cita destacada:** "Colombia es un Estado Social de Derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática, participativa y pluralista." — Artículo 1 de la Constitución colombiana

## ¿Qué es el Estado Social de Derecho?

Es un modelo que combina dos elementos:

**Estado de Derecho:** el poder público está sometido a la ley y debe ejercerse dentro de los límites constitucionales. Todas las autoridades actúan según el principio de legalidad.

**Estado Social:** el Estado no solo garantiza libertades individuales, sino que debe tomar acción para corregir desigualdades y garantizar condiciones de vida digna para todos.

**En la práctica, esto significa:**

- El Estado debe proteger los derechos fundamentales.
- Debe promover la igualdad material, no solo formal.
- Debe intervenir en la economía para corregir fallas del mercado.
- Debe garantizar servicios públicos como salud, educación y seguridad social.

## Principios del Estado Social de Derecho

1. **Dignidad humana:** es el principio fundante de todo el orden constitucional.
2. **Solidaridad:** los ciudadanos y el Estado deben colaborar para lograr el bien común.
3. **Eficiencia:** los recursos públicos deben administrarse buscando el máximo beneficio social.
4. **Participación:** los ciudadanos tienen derecho a incidir en las decisiones públicas.

> **Ejemplo práctico:** Cuando el Estado colombiano crea un programa de alimentación escolar, no está haciendo una simple obra de caridad. Está cumpliendo con su obligación constitucional de garantizar el derecho a la alimentación de los niños en situación de vulnerabilidad, como parte del Estado Social de Derecho.

## Derechos que garantiza el Estado Social de Derecho

**Derechos fundamentales:** vida, igualdad, libertad de expresión, debido proceso.
**Derechos sociales:** educación, salud, trabajo, seguridad social, vivienda.
**Derechos colectivos:** medio ambiente sano, patrimonio cultural, espacio público.

> **¿Sabías que?** La Constitución colombiana consagra el derecho a la vivienda digna como un derecho social, pero la Corte Constitucional ha dicho que este derecho es de carácter progresivo, lo que significa que el Estado debe avanzar gradualmente en su garantía según sus capacidades.

## Desafíos en la implementación

A pesar de su consagración constitucional, el Estado Social de Derecho enfrenta desafíos en Colombia:

- **Recursos limitados:** las obligaciones sociales son amplias, pero el presupuesto es finito.
- **Corrupción:** desvía recursos que deberían destinarse a programas sociales.
- **Desigualdad regional:** las capacidades institucionales varían enormemente entre regiones.
- **Informalidad:** más de la mitad de la fuerza laboral está en la economía informal, lo que dificulta la garantía de derechos laborales.

## Para recordar

El Estado Social de Derecho no es una declaración vacía. Es un compromiso constitucional que obliga al Estado a trabajar activamente por la dignidad y el bienestar de todos los ciudadanos. Conocerlo y exigirlo es parte de una ciudadanía informada y participativa.`
    },
    {
      title: "Los desafíos actuales del constitucionalismo",
      slug: "desafios-actuales-del-constitucionalismo",
      description: "Retos contemporáneos para las constituciones y los sistemas democráticos.",
      content: `## El constitucionalismo frente a un mundo que cambia

El constitucionalismo no es una idea estática. Para seguir siendo relevante, debe adaptarse a los nuevos desafíos que plantea el siglo XXI. Desde la revolución digital hasta la crisis climática, las constituciones enfrentan preguntas que sus redactores originales no podían imaginar.

## 1. La revolución digital y los derechos en internet

La tecnología ha transformado la forma en que vivimos, trabajamos y nos relacionamos. Las constituciones deben responder a preguntas fundamentales:

- ¿Cómo proteger la privacidad en la era de los datos masivos?
- ¿Qué hacer con la vigilancia gubernamental y corporativa?
- ¿Cómo garantizar la libertad de expresión sin permitir la desinformación?
- ¿Los algoritmos que toman decisiones sobre nosotros deben ser regulados constitucionalmente?

> **Dato clave:** Varios países han comenzado a reconocer el derecho a la protección de datos personales como un derecho fundamental autónomo. Brasil, México y Colombia ya cuentan con leyes de protección de datos, y la tendencia es que este derecho sea elevado a rango constitucional.

## 2. La crisis climática y el constitucionalismo ambiental

El cambio climático plantea desafíos constitucionales sin precedentes:

- ¿Cómo equilibrar el desarrollo económico con la protección ambiental?
- ¿Las futuras generaciones tienen derechos constitucionales?
- ¿Debe la naturaleza tener derechos propios?

> **Ejemplo práctico:** Colombia fue pionera al reconocer al río Atrato como sujeto de derechos en 2017, una decisión histórica de la Corte Constitucional que abre el camino para un constitucionalismo ecológico.

## 3. La desinformación y la crisis de la democracia

Las noticias falsas, las cámaras de eco digitales y la manipulación informativa amenazan la calidad del debate democrático.

**Problemas que enfrenta el constitucionalismo:**
- La desinformación puede distorsionar procesos electorales.
- La polarización dificulta la construcción de consensos.
- La confianza en las instituciones se erosiona.

## 4. La inteligencia artificial y el poder automatizado

La IA está transformando la toma de decisiones en el sector público y privado:

- ¿Quién es responsable cuando un algoritmo comete un error?
- ¿Los sistemas de IA deben estar sujetos a control constitucional?
- ¿Cómo proteger los derechos frente a decisiones automatizadas?

> **Reflexión:** La inteligencia artificial no debería tomar decisiones que afecten derechos fundamentales sin supervisión humana. El constitucionalismo del siglo XXI debe establecer límites claros al poder automatizado, así como lo hizo con el poder político en el pasado.

## 5. La migración y la ciudadanía global

Los flujos migratorios masivos desafían el modelo tradicional de ciudadanía vinculada a un territorio nacional.

## Para recordar

El constitucionalismo ha demostrado capacidad de adaptación a lo largo de los siglos. Los desafíos actuales no son una amenaza para su existencia, sino una oportunidad para su renovación. Las constituciones del futuro deberán ser más inclusivas, más ecológicas y más conscientes del mundo digital.`
    }
  ];

  for (const article of articles) {
    await createArticle(token, article.title, article.slug, article.description, article.content);
  }
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN CONSTITUCIONALISMO');
}

main().catch(console.error);
