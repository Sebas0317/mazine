const http = require('http');
const HOST='localhost',PORT=1337,CATEGORY_ID=7,AUTHOR_ID=1;

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
  console.log('Creando artículos de Participación Ciudadana...\n');
  const arts=[
    {title:"¿Qué es la participación ciudadana y por qué fortalece la democracia?",slug:"que-es-la-participacion-ciudadana",description:"Introducción al papel de los ciudadanos en la toma de decisiones públicas.",
content:`## Introducción

La participación ciudadana es el alma de la democracia. Sin ciudadanos activos, informados y dispuestos a involucrarse, la democracia se convierte en un cascarón vacío donde pocos deciden por muchos.

> **Reflexión:** La democracia no es un espectáculo donde unos actúan y otros miran. Es un escenario donde todos tenemos un papel que desempeñar.

## ¿Qué es la participación ciudadana?

Es el conjunto de mecanismos y acciones mediante los cuales las personas intervienen en los asuntos públicos. No se limita al voto: incluye la posibilidad de:

- Expresar opiniones y propuestas.
- Presentar iniciativas legislativas.
- Ejercer control social sobre las autoridades.
- Colaborar en la solución de problemas colectivos.
- Participar en consultas y decisiones importantes.

## Formas de participación

| Tipo | Ejemplos | Característica |
|------|----------|----------------|
| Electoral | Voto, candidaturas | Cada cierto tiempo |
| Directa | Referendo, consulta popular | Decisión sobre temas concretos |
| Deliberativa | Cabildos, foros | Discusión y debate |
| Social | Veedurías, ONG | Control y seguimiento |
| Digital | Peticiones en línea, plataformas | Participación mediada por tecnología |

## ¿Por qué fortalece la democracia?

1. **Legitimidad:** las decisiones participativas son más aceptadas.
2. **Transparencia:** el escrutinio público reduce la corrupción.
3. **Efectividad:** las políticas se ajustan mejor a las necesidades reales.
4. **Empoderamiento:** los ciudadanos se convierten en protagonistas.
5. **Control:** el poder es vigilado permanentemente.

> **Dato clave:** La Constitución de 1991 fue un parteaguas: pasó de una democracia puramente representativa a una participativa, creando mecanismos para que los ciudadanos incidan directamente en las decisiones.

## Reflexión

La participación ciudadana no es un favor que el Estado concede. Es un derecho constitucional y una responsabilidad democrática. Una sociedad que participa es una sociedad que se fortalece.`},
    {title:"La democracia participativa en la Constitución de 1991",slug:"democracia-participativa-constitucion-1991",description:"El cambio de enfoque que transformó la relación entre ciudadanos y Estado.",
content:`## Un nuevo pacto democrático

La Constitución de 1991 no solo actualizó el marco jurídico colombiano: transformó la concepción misma de la democracia en el país, pasando de un modelo puramente representativo a uno participativo.

> **Reflexión:** La Constitución de 1991 le dijo a los colombianos: "Ustedes no son solo espectadores de la democracia, son protagonistas".

## ¿Qué cambió con la Constitución de 1991?

**Antes de 1991:**
- Democracia representativa exclusivamente.
- Los ciudadanos elegían y luego perdían el control.
- Escasos mecanismos de participación directa.
- Centralismo en la toma de decisiones.

**Después de 1991:**
- Democracia participativa y pluralista.
- Múltiples canales de intervención ciudadana.
- Descentralización y autonomía territorial.
- Control social y rendición de cuentas.

## Mecanismos incorporados

La Constitución de 1991 estableció los siguientes mecanismos de participación:

**Artículo 103:** "Son mecanismos de participación del pueblo en ejercicio de su soberanía: el voto, el plebiscito, el referendo, la consulta popular, el cabildo abierto, la iniciativa legislativa y la revocatoria del mandato."

> **¿Sabías que?** La Asamblea Nacional Constituyente de 1991 recibió más de 150.000 propuestas ciudadanas durante su funcionamiento, muchas de las cuales fueron incorporadas al texto constitucional.

## Principios de la democracia participativa

- **Pluralismo:** reconocimiento de la diversidad de voces.
- **Inclusión:** participación de todos los sectores sociales.
- **Deliberación:** las decisiones se toman después del debate.
- **Control:** los ciudadanos vigilan a sus gobernantes.
- **Progresividad:** la participación se amplía constantemente.

## Legado

La Constitución de 1991 sentó las bases para una democracia más incluyente. Los mecanismos que creó han permitido a los colombianos incidir en decisiones fundamentales y ejercer control sobre sus gobernantes de maneras que antes eran imposibles.`},
    {title:"La Ley 134 de 1994 y el desarrollo de la participación ciudadana",slug:"ley-134-de-1994",description:"La norma que reglamentó los mecanismos de participación.",
content:`## De la Constitución a la práctica

La Constitución de 1991 estableció los principios, pero necesitaba leyes que los hicieran operativos. La Ley 134 de 1994 fue la primera en cumplir esa tarea.

> **Reflexión:** Una constitución sin leyes que la desarrollen es como un manual de instrucciones sin herramientas. La Ley 134 proporcionó las herramientas.

## ¿Qué reguló la Ley 134?

**Mecanismos de participación:**
- **Referendo:** aprobación o derogación de normas.
- **Consulta popular:** decisión sobre asuntos de interés colectivo.
- **Plebiscito:** consulta del Gobierno sobre decisiones importantes.
- **Cabildo abierto:** reunión pública de corporaciones administrativas.
- **Iniciativa legislativa:** propuesta de normas por ciudadanos.
- **Revocatoria del mandato:** destitución de funcionarios electos.

**Procedimientos:**
- Requisitos para convocar cada mecanismo.
- Números de firmas necesarias.
- Plazos y trámites.
- Financiación y publicidad de las campañas.

> **Dato clave:** Para convocar un referendo se necesitaba el 5% del censo electoral. La Ley 134 estableció este y otros requisitos que luego fueron modificados por la Ley 1757 de 2015.

## Importancia de la Ley 134

- Convirtió los principios constitucionales en procedimientos concretos.
- Estableció reglas claras para el juego democrático.
- Permitió que los ciudadanos conocieran cómo ejercer sus derechos.
- Creó las bases para el desarrollo posterior de la participación.

## Reflexión

La Ley 134 fue el primer paso para construir una cultura de participación en Colombia. Aunque hoy ha sido actualizada, su importancia histórica es incuestionable.`},
    {title:"La Ley 1757 de 2015 y el fortalecimiento de la participación ciudadana",slug:"ley-1757-de-2015",description:"Actualización normativa para ampliar la participación democrática.",
content:`## Una nueva etapa para la participación

Veintiún años después de la Ley 134, Colombia aprobó una nueva ley que actualizó y fortaleció los mecanismos de participación ciudadana. La Ley 1757 de 2015 representó un avance significativo en la consolidación de la democracia participativa.

> **Reflexión:** Las leyes de participación no son estáticas. Deben actualizarse para responder a las nuevas realidades y demandas ciudadanas.

## Principales innovaciones de la Ley 1757

**1. Facilitación de los mecanismos**
- Reducción del número de firmas requeridas para convocar referendos.
- Simplificación de trámites administrativos.
- Mayor acceso a información sobre los mecanismos.

**2. Rendición de cuentas**
- Obligación de todas las autoridades de rendir cuentas periódicamente.
- Participación ciudadana en las audiencias de rendición.
- Estandarización de formatos y procedimientos.

**3. Control social**
- Fortalecimiento de las veedurías ciudadanas.
- Apoyo institucional a organizaciones de control.
- Protección a ciudadanos que ejercen control social.

**4. Promoción de la participación**
- Creación del Consejo Nacional de Participación.
- Obligación de las entidades territoriales de promover la participación.
- Inclusión de la participación en los planes de desarrollo.

> **Dato clave:** La Ley 1757 estableció que todas las entidades públicas deben rendir cuentas al menos una vez al año, con participación ciudadana activa.

## Impacto de la Ley 1757

- Aumento de las iniciativas de participación local.
- Mayor transparencia en la gestión pública.
- Fortalecimiento de las veedurías ciudadanas.
- Más herramientas para el control social.

## Para recordar

La Ley 1757 de 2015 demostró que la participación ciudadana es un derecho en constante evolución. Cada nueva ley, cada nuevo mecanismo, amplía las posibilidades de que los ciudadanos incidamos en las decisiones que afectan nuestras vidas.`},
    {title:"El referendo: cuando los ciudadanos deciden directamente",slug:"el-referendo",description:"Uno de los mecanismos más importantes de participación popular.",
content:`## La voz directa del pueblo

El referendo es uno de los mecanismos más poderosos de la democracia participativa. Permite que los ciudadanos decidan directamente sobre normas y decisiones que afectan a toda la sociedad.

> **Reflexión:** En el referendo, el poder deja de ser delegado y vuelve a su titular original: el pueblo.

## ¿Qué es un referendo?

Es una votación popular mediante la cual los ciudadanos aprueban o rechazan una propuesta normativa o una reforma jurídica. Puede ser de dos tipos:

**Referendo aprobatorio**
Los ciudadanos deciden si una propuesta normativa debe convertirse en ley.

**Referendo derogatorio**
Los ciudadanos deciden si una norma existente debe ser eliminada.

## Características del referendo

- **Vinculante:** si se cumplen los requisitos, el resultado es obligatorio.
- **Directo:** los ciudadanos votan sin intermediarios.
- **Universal:** pueden participar todos los ciudadanos habilitados.
- **Regulado:** la ley establece los procedimientos y requisitos.

> **¿Sabías que?** En 2016 se realizó en Colombia un plebiscito (similar al referendo) para refrendar los Acuerdos de Paz con las FARC. Aunque ganó el "No", el Gobierno implementó el acuerdo con ajustes, demostrando que estos mecanismos tienen un impacto real en la vida política.

## Requisitos para convocar un referendo

1. Iniciativa del Gobierno, del Congreso o de los ciudadanos.
2. Recolección de firmas (número establecido por la ley).
3. Revisión de constitucionalidad por la Corte Constitucional.
4. Convocatoria a votación por parte de las autoridades electorales.
5. Participación mínima (umbral) para que sea válido.

## Importancia democrática

El referendo fortalece la democracia porque:
- Permite la participación directa en decisiones fundamentales.
- Legitima las decisiones con el respaldo popular.
- Frena decisiones impopulares de los gobernantes.
- Educa políticamente a la ciudadanía.`},
    {title:"Referendo aprobatorio: la ciudadanía como protagonista del cambio",slug:"referendo-aprobatorio",description:"Cómo funciona este mecanismo para aprobar propuestas normativas.",
content:`## Cuando el pueblo dice sí

El referendo aprobatorio es el mecanismo mediante el cual los ciudadanos deciden si una propuesta normativa debe convertirse en ley. Es la expresión más directa de la soberanía popular.

> **Reflexión:** El referendo aprobatorio convierte a cada ciudadano en legislador. Por un día, todos tenemos el poder de decir si una norma merece o no ser parte de nuestro ordenamiento jurídico.

## ¿Cómo funciona?

**Paso 1:** Una propuesta normativa es elaborada por ciudadanos, el Gobierno o el Congreso.
**Paso 2:** La propuesta es revisada por la Corte Constitucional para verificar que no viole la Constitución.
**Paso 3:** Se convoca a votación popular.
**Paso 4:** Los ciudadanos votan "Sí" o "No".
**Paso 5:** Si gana el "Sí" y se cumple el umbral de participación, la norma entra en vigencia.

## Ventajas del referendo aprobatorio

- **Legitimidad democrática:** una norma aprobada por el pueblo tiene una fuerza moral incuestionable.
- **Participación directa:** los ciudadanos deciden, no solo los representantes.
- **Control popular:** evita que se impongan normas impopulares.
- **Educación cívica:** promueve el debate público y la información ciudadana.

> **Ejemplo práctico:** Si el Gobierno propusiera una reforma tributaria profunda, podría someterla a referendo aprobatorio. Los ciudadanos decidirían si aceptan los nuevos impuestos o los rechazan.

## Desafíos

- **Baja participación:** si no vota suficiente gente, el resultado no es válido.
- **Complejidad:** los temas pueden ser técnicos y difíciles de entender.
- **Manipulación:** las campañas pueden desinformar a los votantes.
- **Costos:** organizar un referendo es costoso.

## Para recordar

El referendo aprobatorio es una herramienta poderosa que debe usarse con responsabilidad. No todos los temas son adecuados para este mecanismo, pero cuando se usa correctamente, fortalece profundamente la democracia.`},
    {title:"Referendo derogatorio: la posibilidad de eliminar normas existentes",slug:"referendo-derogatorio",description:"Herramienta para que los ciudadanos eliminen normas existentes.",
content:`## El poder de decir "basta"

Si el referendo aprobatorio permite crear normas, el derogatorio permite eliminarlas. Es el mecanismo mediante el cual los ciudadanos pueden expresar su desacuerdo con una ley existente y solicitar su eliminación.

> **Reflexión:** El referendo derogatorio es el recordatorio de que el poder no solo crea, también puede deshacer. Es el control ciudadano sobre las decisiones pasadas.

## Características

- Permite someter a votación popular la derogación de una ley.
- Puede ser convocado por ciudadanos mediante recolección de firmas.
- Requiere revisión de constitucionalidad.
- El resultado es vinculante si se cumple el umbral de participación.

## ¿Cuándo tiene sentido?

El referendo derogatorio es útil cuando:
- Una ley aprobada por el Congreso es impopular.
- Los mecanismos de representación no reflejan la voluntad popular.
- Existe evidencia de que la ley fue aprobada sin suficiente debate.
- La ciudadanía considera que la ley es perjudicial.

> **Dato clave:** La Constitución colombiana establece que no pueden someterse a referendo derogatorio las leyes que aprueban tratados internacionales, la ley de presupuesto ni las que desarrollan derechos fundamentales.

## Limitaciones

- No procede para todas las leyes (hay materias excluidas).
- Requiere un número significativo de firmas.
- El umbral de participación puede ser difícil de alcanzar.
- Las campañas pueden ser costosas y desiguales.

## Importancia democrática

El referendo derogatorio es importante porque:
- Equilibra el poder del Legislativo.
- Permite corregir decisiones equivocadas.
- Mantiene a los legisladores alerta.
- Fortalece la soberanía popular.

## Para recordar

El referendo derogatorio es una válvula de seguridad del sistema democrático. Saber que una ley puede ser derogada por el pueblo obliga a los legisladores a actuar con responsabilidad y cercanía a la voluntad ciudadana.`},
    {title:"La revocatoria del mandato como mecanismo de control ciudadano",slug:"revocatoria-del-mandato",description:"La posibilidad de evaluar la gestión de alcaldes y gobernadores.",
content:`## Cuando los gobernantes rinden cuentas

La revocatoria del mandato es uno de los mecanismos más innovadores de la democracia participativa colombiana. Permite que los ciudadanos destituyan anticipadamente a un alcalde o gobernador cuando consideran que su gestión no cumple con las expectativas.

> **Reflexión:** La revocatoria del mandato le recuerda a todo gobernante que su cargo no es una propiedad, sino un encargo temporal que puede ser interrumpido si no se cumple adecuadamente.

## ¿Cómo funciona?

**Paso 1:** Un grupo de ciudadanos promueve la revocatoria.
**Paso 2:** Recolectan firmas de al menos el 25% de los votantes que participaron en la elección del funcionario.
**Paso 3:** La Registraduría verifica las firmas.
**Paso 4:** Se convoca a votación.
**Paso 5:** Los ciudadanos votan si revocan o no el mandato.
**Paso 6:** Para que sea válida, debe votar al menos el 40% del censo electoral.

## ¿A quiénes aplica?

- Alcaldes municipales y distritales.
- Gobernadores departamentales.

> **¿Sabías que?** La revocatoria no aplica para presidente, senadores ni representantes a la Cámara. Solo para autoridades territoriales elegidas por voto popular.

## Casos destacados en Colombia

- **Bogotá (2004):** el alcalde Antanas Mockus enfrentó un proceso de revocatoria que no alcanzó el umbral.
- **Varios municipios:** en diversos lugares del país se han realizado procesos de revocatoria, algunos exitosos.

## ¿Por qué es importante?

1. **Responsabilidad política:** los gobernantes saben que pueden ser evaluados.
2. **Participación continua:** la democracia no termina el día de la elección.
3. **Control ciudadano:** los ciudadanos pueden corregir una mala elección.
4. **Legitimidad:** un gobernante que supera una revocatoria sale fortalecido.

## Desafíos

- El umbral de participación (40%) es muy alto.
- Las campañas de revocatoria son costosas.
- Puede ser usada como arma política.
- El proceso puede ser manipulado por intereses particulares.

## Para recordar

La revocatoria del mandato es una herramienta de control ciudadano que, a pesar de sus dificultades prácticas, representa un avance democrático significativo. Es la expresión más clara de que el poder del gobernante no es absoluto.`},
    {title:"El plebiscito y las decisiones de trascendencia nacional",slug:"el-plebiscito",description:"Un mecanismo para consultar a la ciudadanía sobre decisiones políticas relevantes.",
content:`## La consulta sobre el rumbo del país

El plebiscito es un mecanismo mediante el cual el Gobierno Nacional consulta a los ciudadanos sobre una decisión política de especial importancia para el país. A diferencia del referendo, no se enfoca en la aprobación de textos normativos específicos.

> **Reflexión:** El plebiscito es la herramienta que permite al Gobierno medir el pulso de la nación antes de tomar decisiones trascendentales.

## Plebiscito vs. Referendo

| Aspecto | Plebiscito | Referendo |
|---------|------------|-----------|
| Objeto | Decisión política general | Aprobación o derogación de normas |
| Iniciativa | Exclusiva del Gobierno | Gobierno, Congreso o ciudadanos |
| Alcance | Consultivo o vinculante | Vinculante |
| Ejemplo | Plebiscito de paz 2016 | Referendo anticorrupción 2018 |

## El Plebiscito de 2016 en Colombia

El plebiscito más importante de la historia colombiana fue el convocado en 2016 para refrendar los Acuerdos de Paz con las FARC:

- **Pregunta:** "¿Apoya usted el Acuerdo Final para la Terminación del Conflicto y la Construcción de una Paz Estable y Duradera?"
- **Resultado:** ganó el "No" por estrecho margen (50.2% vs. 49.8%).
- **Participación:** apenas el 37.4% del censo electoral.
- **Consecuencia:** el Gobierno renegoció el acuerdo con ajustes y lo implementó.

> **Dato clave:** El Plebiscito de 2016 demostró que estos mecanismos tienen consecuencias reales. Aunque ganó el "No", el acuerdo no se desechó, sino que se ajustó, mostrando la importancia del diálogo democrático.

## Características del plebiscito

- Es convocado por el Presidente de la República.
- Debe contar con el aval del Senado.
- La Corte Constitucional revisa su constitucionalidad.
- Puede ser consultivo o vinculante.

## Importancia democrática

El plebiscito permite:
- Consultar a la ciudadanía sobre el rumbo del país.
- Legitimar decisiones políticas fundamentales.
- Involucrar a los ciudadanos en el destino nacional.
- Generar debate público informado.

## Reflexión

El plebiscito es un mecanismo poderoso que debe usarse con responsabilidad. Consultar al pueblo sobre decisiones fundamentales es un acto de respeto democrático, pero también implica el riesgo de simplificar temas complejos.`},
    {title:"La consulta popular: participación directa en asuntos de interés colectivo",slug:"consulta-popular",description:"Herramienta para conocer la voluntad de los ciudadanos.",
content:`## Decidir sobre lo que nos afecta

La consulta popular permite que los ciudadanos expresen su opinión sobre asuntos de interés general mediante una votación. Es un mecanismo que puede aplicarse en diferentes niveles territoriales, acercando las decisiones a las comunidades.

> **Reflexión:** La consulta popular es el mecanismo que permite a las comunidades decidir sobre los temas que más les afectan, desde proyectos mineros hasta políticas locales.

## Tipos de consulta popular

**Consulta nacional**
El Gobierno consulta a todos los colombianos sobre un tema de interés general.

**Consulta departamental**
El gobernador consulta a los habitantes de su departamento.

**Consulta municipal o distrital**
El alcalde consulta a los habitantes de su municipio.

## Consultas populares mineras en Colombia

En los últimos años, varias comunidades han utilizado consultas populares para decidir sobre proyectos minero-energéticos en sus territorios:

- **Cajamarca (Tolima):** la comunidad dijo "No" al proyecto minero La Colosa.
- **Piedras (Tolima):** la comunidad rechazó proyectos de explotación minera.
- **Municipios de Cundinamarca:** varias consultas se han realizado en torno a proyectos mineros.

> **Dato clave:** La Corte Constitucional ha avalado la realización de consultas populares en temas mineros, reconociendo el derecho de las comunidades a decidir sobre el uso de su territorio.

## Características

- Puede ser convocada por autoridades locales o nacionales.
- La pregunta debe ser clara y comprensible.
- El resultado es vinculante si participa al menos la tercera parte del censo.
- No puede versar sobre temas que ya fueron decididos por otros mecanismos.

## Importancia

La consulta popular fortalece la democracia porque:
- Permite la participación directa en decisiones locales.
- Respeta la autonomía territorial.
- Evita imposiciones desde el nivel central.
- Promueve el debate informado en las comunidades.

## Para recordar

La consulta popular es un mecanismo que acerca la democracia a la vida cotidiana de las personas. Cuando una comunidad decide sobre su territorio, está ejerciendo el derecho más puro de la democracia participativa.`},
    {title:"El cabildo abierto y la participación en los gobiernos locales",slug:"cabildo-abierto",description:"Un espacio de diálogo entre autoridades y ciudadanos.",
content:`## La democracia en el barrio

El cabildo abierto es uno de los mecanismos de participación más accesibles para los ciudadanos. Permite que las personas intervengan directamente en las reuniones de los concejos municipales o distritales para discutir temas que afectan a su comunidad.

> **Reflexión:** El cabildo abierto convierte el concejo municipal en una plaza pública donde todos tienen derecho a la palabra.

## ¿Qué es un cabildo abierto?

Es una reunión pública de los concejos municipales, distritales o de las juntas administradoras locales (JAL) en la que los ciudadanos pueden participar directamente para discutir asuntos de interés colectivo.

**Características:**
- Es un espacio de diálogo directo entre autoridades y ciudadanos.
- Cualquier persona puede solicitar su realización.
- Los ciudadanos pueden intervenir y presentar propuestas.
- Las autoridades están obligadas a escuchar y responder.

## ¿Cómo participar?

1. **Solicitud:** un grupo de ciudadanos solicita la realización del cabildo.
2. **Tema:** se define el asunto a discutir.
3. **Convocatoria:** se anuncia la fecha y el lugar.
4. **Desarrollo:** los ciudadanos intervienen y las autoridades responden.
5. **Conclusiones:** se elabora un acta con los resultados.

> **Ejemplo práctico:** Una comunidad preocupada por la construcción de una planta de tratamiento de aguas en su barrio puede solicitar un cabildo abierto para discutir el tema con el concejo municipal y la administración local.

## ¿Por qué es importante?

- Permite el diálogo directo entre la comunidad y sus representantes.
- Facilita la solución de conflictos locales.
- Promueve la transparencia en las decisiones municipales.
- Empodera a las comunidades para participar activamente.

## Ventajas

- Es gratuito y no requiere formalidades complejas.
- Puede solicitarse por un número reducido de ciudadanos.
- Aborda temas específicos de la comunidad.
- Genera compromisos concretos por parte de las autoridades.

## Para recordar

El cabildo abierto es la democracia en su expresión más local y cercana. Es la oportunidad de que los ciudadanos hablen directamente con quienes toman las decisiones en su municipio.`},
    {title:"Veedurías ciudadanas y control social",slug:"veedurias-ciudadanas",description:"La vigilancia ciudadana como herramienta para fortalecer la transparencia.",
content:`## El ojo vigilante de la ciudadanía

Las veedurías ciudadanas son uno de los mecanismos más efectivos de control social. Permiten que los ciudadanos supervisen la gestión pública, vigilen el uso de los recursos y contribuyan a la transparencia del Estado.

> **Reflexión:** La corrupción se alimenta del silencio y la oscuridad. Las veedurías ciudadanas encienden la luz donde antes había sombras.

## ¿Qué es una veeduría ciudadana?

Es un mecanismo mediante el cual los ciudadanos o las organizaciones sociales ejercen vigilancia sobre la gestión pública, los recursos públicos y la conducta de los funcionarios del Estado.

**Objetivos:**
- Promover la transparencia en la administración pública.
- Prevenir actos de corrupción.
- Fortalecer la confianza en las instituciones.
- Mejorar la calidad de la gestión pública.

## ¿Qué pueden vigilar las veedurías?

- Contratos y licitaciones públicas.
- Ejecución de obras y proyectos.
- Prestación de servicios públicos.
- Uso de recursos públicos.
- Cumplimiento de metas institucionales.
- Procesos de rendición de cuentas.

> **¿Sabías que?** Las veedurías ciudadanas están reconocidas legalmente en Colombia desde la Ley 850 de 2003, que establece su marco jurídico, sus derechos y sus obligaciones.

## ¿Cómo conformar una veeduría?

1. Reunir un grupo de ciudadanos interesados.
2. Definir el objeto de la vigilancia (un contrato, un proyecto, una institución).
3. Inscribirse formalmente ante la autoridad competente.
4. Solicitar información a las entidades vigiladas.
5. Realizar seguimiento y emitir informes.
6. Denunciar irregularidades encontradas.

## Impacto de las veedurías en Colombia

| Logros | Desafíos |
|--------|----------|
| Descubrimiento de sobrecostos en obras | Falta de capacitación de veedores |
| Mejora en transparencia de licitaciones | Riesgos de seguridad para veedores |
| Recuperación de recursos públicos | Burocracia para la inscripción |
| Denuncia de actos de corrupción | Falta de respuesta institucional |

## Para recordar

Las veedurías ciudadanas demuestran que el control del poder no es responsabilidad exclusiva de las instituciones del Estado. Los ciudadanos organizados pueden y deben vigilar la gestión pública para garantizar que los recursos se usen correctamente.`},
    {title:"Los desafíos de la participación ciudadana en la actualidad",slug:"desafios-de-la-participacion-ciudadana",description:"Retos y oportunidades para la democracia participativa en el siglo XXI.",
content:`## La participación frente a un mundo que cambia

A pesar de los avances normativos y constitucionales, la participación ciudadana enfrenta desafíos profundos que limitan su efectividad. Conocerlos es el primer paso para superarlos.

> **Reflexión:** La participación ciudadana no es un destino que se alcanza, sino un camino que se construye día a día, superando obstáculos y aprovechando oportunidades.

## Principales desafíos

### 1. Apatía y desinterés ciudadano

Muchos ciudadanos no participan porque:
- Sienten que su participación no cambia nada.
- No confían en las instituciones.
- No tienen tiempo o información.
- Perciben la política como algo lejano y corrupto.

### 2. Desinformación

En la era de la información, la desinformación es una amenaza creciente:
- Noticias falsas sobre procesos de participación.
- Manipulación de la opinión pública.
- Falta de educación cívica y política.
- Dificultad para distinguir información confiable.

### 3. Burocracia y obstáculos institucionales

A pesar de las leyes, participar sigue siendo difícil:
- Trámites complejos para usar los mecanismos.
- Altos costos de las campañas de recolección de firmas.
- Umbrales de participación difíciles de alcanzar.
- Falta de voluntad política de algunas autoridades.

> **Dato clave:** La revocatoria del mandato requiere la participación del 40% del censo electoral, un umbral muy alto si se compara con la participación en elecciones ordinarias, que suele rondar el 50-60%.

### 4. Desigualdad en la participación

No todos los ciudadanos participan por igual:
- Las personas con mayor educación y recursos participan más.
- Las zonas rurales tienen menos oportunidades de participación.
- Las comunidades marginadas enfrentan mayores barreras.
- La brecha digital excluye a quienes no tienen acceso a Internet.

### 5. Violencia contra líderes sociales

En Colombia, participar tiene un costo muy alto:
- Líderes sociales y defensores de derechos humanos son asesinados.
- El miedo desincentiva la participación.
- El Estado no garantiza la seguridad de quienes participan.

## Oportunidades y caminos a seguir

**Tecnología y participación digital:**
- Plataformas de consulta en línea.
- Presupuestos participativos digitales.
- Veedurías virtuales.

**Educación ciudadana:**
- Formación en derechos y mecanismos de participación.
- Programas escolares de educación cívica.
- Campañas de información pública.

**Fortalecimiento institucional:**
- Reducción de trámites burocráticos.
- Protección efectiva a líderes sociales.
- Sanciones a autoridades que obstaculizan la participación.

> **Para recordar:** Los desafíos de la participación ciudadana son grandes, pero no insuperables. Cada persona que decide informarse, organizarse y participar contribuye a construir una democracia más fuerte y más cercana a las necesidades de la gente.`
    }
  ];

  for(const a of arts) await create(token,a.title,a.slug,a.description,a.content);
  console.log('\n✅ TODOS LOS ARTICULOS CREADOS EN PARTICIPACIÓN CIUDADANA');
}
main().catch(console.error);
