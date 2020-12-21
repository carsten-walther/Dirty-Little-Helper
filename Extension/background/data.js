/**
 * textsList
 *
 * @type {({name: string, id: string, content: string}|{name: string, userAgent: string, id: string})[]}
 */
let textsList = [
  {
    id: '1',
    name: 'Lorem Ipsum (100 words)',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
  }, {
    id: '2',
    name: 'Lorem Ipsum (80 chars)',
    content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.'
  }, {
    id: '3',
    name: 'Hinter den Wortbergen',
    content: 'Weit hinten, hinter den Wortbergen, fern der Länder Vokalien und Konsonantien leben die Blindtexte. Abgeschieden wohnen Sie in Buchstabhausen an der Küste des Semantik, eines großen Sprachozeans. Ein kleines Bächlein namens Duden fließt durch ihren Ort und versorgt sie mit den nötigen Regelialien. Es ist ein paradiesmatisches Land, in dem einem gebratene Satzteile in den Mund fliegen. Nicht einmal von der allmächtigen Interpunktion werden die Blindtexte beherrscht – ein geradezu unorthographisches Leben. Eines Tages aber beschloss eine kleine Zeile Blindtext, ihr Name war Lorem Ipsum, hinaus zu gehen in die weite Grammatik. Der große Oxmox riet ihr davon ab, da es dort wimmele von bösen Kommata, wilden Fragezeichen und hinterhältigen Semikoli, doch das Blindtextchen ließ sich nicht beirren. Es packte seine sieben Versalien, schob sich sein Initial in den Gürtel und machte sich auf den Weg. Als es die ersten Hügel des Kursivgebirges erklommen hatte, warf es einen letzten Blick zurück auf die Skyline seiner Heimatstadt Buchstabhausen, die Headline von Alphabetdorf und die Subline seiner eigenen Straße, der Zeilengasse. Wehmütig lief ihm eine rethorische Frage über die Wange, dann setzte es seinen Weg fort. Unterwegs traf es eine Copy. Die Copy warnte das Blindtextchen, da, wo sie herkäme wäre sie zigmal umgeschrieben worden und alles, was von ihrem Ursprung noch übrig wäre, sei das Wort „und“ und das Blindtextchen solle umkehren und wieder in sein eigenes, sicheres Land zurückkehren. Doch alles Gutzureden konnte es nicht überzeugen und so dauerte es nicht lange, bis ihm ein paar heimtückische Werbetexter auflauerten, es mit Longe und Parole betrunken machten und es dann in ihre Agentur schleppten, wo sie es für ihre Projekte wieder und wieder missbrauchten. Und wenn es nicht umgeschrieben wurde, dann benutzen Sie es immer noch.'
  }, {
    id: '4',
    name: 'Typoblindtext',
    content: 'Dies ist ein Typoblindtext. An ihm kann man sehen, ob alle Buchstaben da sind und wie sie aussehen. Manchmal benutzt man Worte wie Hamburgefonts, Rafgenduks oder Handgloves, um Schriften zu testen. Manchmal Sätze, die alle Buchstaben des Alphabets enthalten – man nennt diese Sätze »Pangrams«. Sehr bekannt ist dieser: The quick brown fox jumps over the lazy old dog. Oft werden in Typoblindtexte auch fremdsprachige Satzteile eingebaut (AVAIL® and Wefox™ are testing aussi la Kerning), um die Wirkung in anderen Sprachen zu testen. In Lateinisch sieht zum Beispiel fast jede Schrift gut aus. Quod erat demonstrandum. Seit 1975 fehlen in den meisten Testtexten die Zahlen, weswegen nach TypoGb. 204 § ab dem Jahr 2034 Zahlen in 86 der Texte zur Pflicht werden. Nichteinhaltung wird mit bis zu 245 € oder 368 $ bestraft. Genauso wichtig in sind mittlerweile auch Âçcèñtë, die in neueren Schriften aber fast immer enthalten sind. Ein wichtiges aber schwierig zu integrierendes Feld sind OpenType-Funktionalitäten. Je nach Software und Voreinstellungen können eingebaute Kapitälchen, Kerning oder Ligaturen (sehr pfiffig) nicht richtig dargestellt werden.'
  }
]

/**
 * userAgentsList
 *
 * @type {({name: string, userAgents: [{name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}], id: string}|{name: string, userAgents: ({name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number})[], id: string}|{name: string, userAgents: ({name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number})[], id: string}|{name: string, userAgents: [{name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}, {name: string, width: number, userAgent: string, id: string, height: number}], id: string}|{name: string, userAgents: ({name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number}|{name: string, width: number, userAgent: string, id: string, height: number})[], id: string})[]}
 */
let userAgentsList = [
  {
    id: '1',
    name: '599media Foundation Breakpoints',
    userAgents: [
      {
        id: '1',
        name: 'Small',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        height: 768,
        width: 360
      }, {
        id: '2',
        name: 'Medium',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        height: 768,
        width: 640
      }, {
        id: '3',
        name: 'Large',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        height: 768,
        width: 1004
      }, {
        id: '4',
        name: 'xLarge',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        height: 768,
        width: 1140
      }, {
        id: '5',
        name: 'xxLarge',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
        height: 768,
        width: 1440
      }
    ]
  }
]
