const http = require('http');

const HOST = 'localhost';
const PORT = 1337;
const CATEGORY_ID = 3;
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
  console.log('Token obtenido. Creando artículos...');

  const articles = [
    {
      title: "Aristóteles y el origen de la política",
      slug: "aristoteles-y-el-origen-de-la-politica",
      description: "La visión clásica de Aristóteles sobre la vida política.",
      content: `## El legado del filósofo que definió al ser humano como animal político

Hace más de dos mil años, en la Atenas clásica, un filósofo sentó las bases del pensamiento político occidental. Aristóteles, discípulo de Platón y maestro de Alejandro Magno, fue el primero en estudiar la política como una ciencia autónoma y en comprender su vínculo esencial con la naturaleza humana.

> **Cita destacada:** "El hombre es por naturaleza un animal político. Quien no puede vivir en sociedad, o no necesita nada por su propia suficiencia, no es miembro de la ciudad, sino una bestia o un dios." — Aristóteles, *Política*

## El ser humano como ser político

Para Aristóteles, la vida en comunidad no era una elección, sino una necesidad intrínseca del ser humano. A diferencia de otros animales, las personas poseen la capacidad del lenguaje y la razón, lo que les permite deliberar sobre lo justo y lo injusto, lo conveniente y lo perjudicial. Esta capacidad es la base de la vida política.

El filósofo distinguía tres tipos de comunidades humanas: la familia para satisfacer necesidades básicas, la aldea para atender necesidades múltiples, y la polis (ciudad-Estado) para alcanzar el bien común.

## La política como búsqueda del bien común

Uno de los conceptos más importantes en la obra aristotélica es la idea de que la política debe orientarse hacia el bien común. Para Aristóteles, el mejor gobierno no era aquel que concentraba el poder, sino el que lograba crear condiciones para que todos los ciudadanos pudieran desarrollar una vida plena.

**Las formas de gobierno según Aristóteles:**

- **Monarquía:** gobierno de uno solo en beneficio de todos (su forma corrupta: tiranía).
- **Aristocracia:** gobierno de los mejores en beneficio de todos (su forma corrupta: oligarquía).
- **Democracia:** gobierno de muchos en beneficio de todos (su forma corrupta: demagogia).

> **Conceptos clave:** Aristóteles introdujo la noción de "justicia distributiva", según la cual los recursos y honores deben repartirse según el mérito de cada quien. Esta idea sigue siendo fundamental en los debates contemporáneos sobre equidad y políticas públicas.

## El legado de Aristóteles en el pensamiento político actual

Las ideas aristotélicas han influido profundamente en la tradición política occidental. Filósofos como Santo Tomás de Aquino integraron su pensamiento en la doctrina cristiana, y teóricos modernos como Hannah Arendt recuperaron su noción de la política como espacio de deliberación y acción conjunta.

En el contexto colombiano, la idea aristotélica de que la política debe servir al bien común resuena con los principios de la Constitución de 1991, que define a Colombia como un Estado Social de Derecho orientado a garantizar la dignidad humana y la participación ciudadana.

## Reflexión final

Aristóteles nos enseñó que la política no es un mal necesario, sino una dimensión esencial de nuestra humanidad. Participar en los asuntos públicos no es solo un derecho, sino una forma de realización personal y colectiva. En tiempos de desencanto político, recordar sus enseñanzas puede ayudarnos a recuperar el sentido profundo de la vida en comunidad.`
    },
    {
      title: "Maquiavelo y la política como ejercicio del poder",
      slug: "maquiavelo-y-la-politica-como-ejercicio-del-poder",
      description: "Una mirada realista sobre el poder político.",
      content: `## El pensador que separó la política de la moral

Nicolás Maquiavelo (1469-1527) es uno de los autores más controvertidos y malinterpretados de la historia del pensamiento político. Con su obra *El Príncipe*, publicada en 1532, marcó una ruptura radical con la tradición anterior al analizar la política no como debía ser, sino como realmente era.

## Idealismo vs. realismo político

Para entender a Maquiavelo, es necesario contrastar su enfoque con el de sus predecesores:

**Idealismo político (Platón, Aristóteles):**
- La política debe orientarse por principios morales universales.
- El gobernante debe ser virtuoso y justo.
- El objetivo final es el bien común.

**Realismo político (Maquiavelo):**
- La política debe analizarse desde la realidad concreta.
- El gobernante debe estar dispuesto a actuar de manera pragmática.
- El objetivo principal es mantener el poder y la estabilidad del Estado.

## Las enseñanzas de El Príncipe

La obra más famosa de Maquiavelo fue escrita como un manual para gobernantes. Algunas de sus ideas más destacadas incluyen:

1. El príncipe debe ser como el león y el zorro: fuerte para imponer respeto, pero astuto para evitar trampas.
2. Es mejor ser temido que amado: si no se puede ser ambas cosas, el temor es más seguro porque depende de la voluntad del gobernante, no del pueblo.
3. La virtud política (virtù): la capacidad de adaptarse a las circunstancias cambiantes y actuar con decisión.
4. La fortuna: los gobernantes exitosos son aquellos que saben aprovechar las oportunidades que el azar les presenta.

> **¿Sabías que?** El término "maquiavélico" surgió como una caracterización negativa del pensamiento de Maquiavelo, pero muchos estudiosos actuales consideran que esta interpretación es injusta y simplista. Maquiavelo no promovía la maldad, sino que describía la política sin hipocresía.

## Maquiavelo y la república

Aunque *El Príncipe* es su obra más conocida, Maquiavelo también escribió *Discursos sobre la Primera Década de Tito Livio*, donde analiza las repúblicas y defiende la participación ciudadana. En esta obra, Maquiavelo se muestra partidario del gobierno republicano, lo que ha llevado a muchos estudiosos a preguntarse si *El Príncipe* fue realmente un manual para tiranos o una sátira política.

## Relevancia contemporánea

Las ideas de Maquiavelo siguen siendo relevantes en el análisis político actual. Sus reflexiones sobre el poder, la estrategia y la naturaleza humana son estudiadas no solo en ciencia política, sino también en escuelas de negocios y liderazgo.

En Colombia, su pensamiento invita a reflexionar sobre cómo se ejerce el poder en contextos complejos y cómo los líderes pueden navegar entre principios éticos y realidades políticas difíciles.`
    },
    {
      title: "Thomas Hobbes y el nacimiento del Estado moderno",
      slug: "thomas-hobbes-y-el-nacimiento-del-estado-moderno",
      description: "El pensamiento de Hobbes y su influencia en la organización política.",
      content: `## El filósofo que imaginó un mundo sin Estado

Thomas Hobbes (1588-1679) vivió en una época de guerras civiles y conflictos religiosos que marcaron profundamente su pensamiento. Su obra más importante, *Leviatán* (1651), es una de las fundamentaciones teóricas más influyentes del Estado moderno.

> **Cita destacada:** "El hombre es un lobo para el hombre." — Thomas Hobbes

## El estado de naturaleza

Para explicar el origen del Estado, Hobbes desarrolló un experimento mental: ¿cómo sería la vida sin gobierno, sin leyes, sin autoridad? A esta situación hipotética la llamó **estado de naturaleza**.

En el estado de naturaleza, según Hobbes, todos los seres humanos son iguales en capacidad física y mental, los recursos son limitados, no existen normas ni autoridad que regulen la convivencia, y reina la desconfianza y la competencia permanente. El resultado es una **guerra de todos contra todos**, donde la vida es "solitaria, pobre, desagradable, brutal y corta".

> **Conceptos clave:** El "estado de naturaleza" es una construcción teórica que no describe una época histórica real, sino una condición hipotética que sirve para justificar la necesidad del Estado.

## El contrato social

La única salida a esta situación, argumenta Hobbes, es que los individuos acuerden ceder parte de su libertad a una autoridad común que garantice la paz y la seguridad. Este acuerdo es el **contrato social**.

**Elementos del contrato social hobbesiano:**

1. Los individuos renuncian a su derecho a gobernarse a sí mismos.
2. Transfieren ese derecho a un soberano (que puede ser una persona o una asamblea).
3. El soberano tiene poder absoluto para mantener el orden.
4. Los súbditos no tienen derecho a rebelarse, pues el soberano no es parte del contrato.

> **Ejemplo práctico:** Imagina un edificio sin administrador. Cada vecino hace lo que quiere: algunos ponen música alta, otros acumulan basura en los pasillos, nadie paga los servicios comunes. Para evitar el caos, los vecinos acuerdan elegir un administrador con autoridad para establecer y hacer cumplir reglas. Eso es, en esencia, el contrato social de Hobbes.

## Hobbes y el Estado moderno

La teoría hobbesiana sentó las bases del Estado moderno en varios aspectos:

- **Soberanía:** el Estado debe tener autoridad suprema dentro de su territorio.
- **Legitimidad:** el poder del Estado se basa en el consentimiento (aunque sea implícito) de los gobernados.
- **Seguridad:** la función principal del Estado es garantizar la paz y proteger a los ciudadanos.

## Línea de tiempo: Hobbes y su contexto

- **1588:** Nace Thomas Hobbes en Westport, Inglaterra.
- **1642:** Estalla la Guerra Civil Inglesa entre realistas y parlamentarios.
- **1651:** Publicación de *Leviatán*, su obra cumbre.
- **1660:** Restauración de la monarquía en Inglaterra.
- **1679:** Muere Hobbes a los 91 años.

## Reflexión final

La pregunta que Hobbes nos deja sigue vigente: ¿cómo equilibramos la libertad individual con la necesidad de orden social? En un mundo donde las democracias enfrentan desafíos como la polarización y la desinformación, el problema hobbesiano de la convivencia pacífica sigue siendo tan relevante como en el siglo XVII.`
    }
  ];

  for (const article of articles) {
    await createArticle(token, article.title, article.slug, article.description, article.content);
  }
  console.log('\\nProceso completado.');
}

main().catch(console.error);
