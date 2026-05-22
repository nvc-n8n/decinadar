"use client";

import AnimatedSection from "./AnimatedSection";

const childhoodParagraphs = [
  "Svako detinjstvo ima svoju priču. Generacije se menjaju, menjaju se navike, način života, pa samim tim i samo detinjstvo. Nužno je da idemo u korak sa vremenom, ali često se pitam koliko daleko treba da idemo i šta usput gubimo.",
  "Veliki sam zagovornik detinjstva igre, a ne detinjstva mobilnih telefona.",
  "Kada se vratim dvadeset i pet godina unazad, u vreme kada sam imala tri ili četiri godine, verovali ili ne, sećam se mnogo stvari. Danas zaboravim gde sam ostavila telefon ili ključeve, ali miris mog dvorišta i dalje pamtim. Pamtim slobodu. Pamtim detinjstvo koje nije bilo organizovano kroz ekrane, već kroz ulicu, dvorište i društvo.",
  "Odrasla sam na selu, u ulici punoj dece. Nismo imali planove, aplikacije ni dogovore danima unapred. Dovoljno je bilo da neko vikne ispred kuće: “Hoćeš napolje?” i igra je već počinjala. Dve kuće udaljene jedna od druge tada su delovale kao ceo svet, a opet smo svi bili jedni kod drugih za minut.",
  "Igrali smo se svime, samo ne igračkama. Priroda nam je bila najveća inspiracija. Blato je postajalo ručak, lišće lipe sarme, pesak kolači, seno kreveti, a kukuruz lutke. Sećam se čuvene lipe u našem dvorištu koja je svake godine cvetala sve više i više, a njen miris je bio znak da leto dolazi.",
  "Od drvenih gajbi za flaše pravili smo stolove i stolice kako bismo “ručali” napolju. Kolena su nam gotovo stalno bila oguljena, jer se trčalo, padalo i ustajalo bez mnogo drame. Igrale su se igre koje su imale neku posebnu draž, toliko veliku da nisi želeo da staneš ni kada si umoran.",
  "Kad padne veče, teško nam je bilo da uđemo u kuću.",
  "O telefonima nismo znali ništa. Drugarice sam zvala na fiksni telefon i samo pitala: “Hoćemo da se igramo?” Danas to zvuči tako jednostavno, a zapravo je bilo prelepo.",
  "Verujem da tada nije bilo mnogo drugačije ni u gradu. Bilo je manje automobila, više parkova, više dece napolju i nekako više vremena jednih za druge.",
  "Danas je situacija drugačija. Živimo mnogo brže. Roditelji imaju manje vremena tokom nedelje za parkove, prirodu i zajedničke trenutke. Deca sve ranije dobijaju telefone, a sve kasnije uče kako da se zaista igraju.",
  "I to nije kritika roditelja. Vreme u kojem živimo je drugačije i mnogo zahtevnije. Ali kao vaspitač primećujem koliko je mašta kod dece postala siromašnija, koliko im je teško da osmisle igru bez gotovog sadržaja i koliko brzo odustaju kada im postane dosadno.",
  "A upravo u toj dosadi nekada je nastajala najveća kreativnost.",
  "Tada smo sami smišljali igre. Pravili svetove od kartona, granja, ćebadi i kamenčića. Učili smo da pregovaramo, čekamo red, rešavamo konflikte i budemo deo grupe, sve kroz igru.",
  "Danas deci često nudimo gotovu zabavu, a zaboravljamo koliko je važno da dete nekada samo stvori svoju.",
  "Zato bih volela da vratimo u modu druženje. Da vratimo žmurke, lastiš, jurke, pravljenje kolača od blata, vožnju bicikla do mraka i onu iskrenu dečju rečenicu: “Mama, idem napolje da se igram.”",
  "Jer detinjstvo ne bi trebalo da stane u ekran.",
  "Detinjstvo treba da miriše na travu, leto, oguljena kolena i sreću zbog koje zaboraviš koliko je sati.",
];

const ebookBullets = [
  "praktične jutarnje, popodnevne i večernje rutine",
  "konkretni primeri iz svakodnevnog života",
  "saveti kako da dete lakše sarađuje",
  "objašnjenja zašto dete u vrtiću može, a kod kuće “neće”",
  "pitanja za roditelje i smernice za promene",
  "smirujuće rečenice koje pomažu u teškim trenucima",
  "bonus bojanka rutina za decu",
  "dodatak sa ček listama i tabelama za praćenje navika",
];

export default function BlogSection() {
  return (
    <section id="blog" className="relative py-24 md:py-32 px-6 bg-cream-white overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="inline-block bg-rose-light text-brown font-sans font-semibold text-sm px-5 py-2 rounded-full mb-6">
              Blog
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-brown mb-6 text-balance">
              Razmišljanja iz ugla vaspitača
            </h2>
            <p className="font-sans text-brown-light leading-relaxed text-pretty">
              U blogu ću pisati svoja razmišljanja i deliti stvari onako kako ih
              ja vidim, ali na način koji će možda nekome pomoći, dati drugačiji
              pogled ili vratiti neka lepa sećanja. Sve iz ugla vaspitača, ali i
              deteta koje i dalje u sebi čuva svoje detinjstvo.
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-10">
          <AnimatedSection delay={0.1}>
            <article className="bg-cream rounded-softer shadow-soft-lg p-6 md:p-10">
              <p className="font-sans text-sm font-semibold text-lavender-dark mb-3">
                Prvi zapis
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-6 text-balance">
                Detinjstvo nekada i sada
              </h3>
              <div className="space-y-4 font-sans text-brown-light leading-relaxed text-pretty">
                {childhoodParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <article className="bg-rose/35 rounded-softer shadow-soft-lg p-6 md:p-10">
              <p className="font-sans text-sm font-semibold text-lavender-dark mb-3">
                E-book najava
              </p>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-brown mb-6 text-balance">
                Rutine koje menjaju ponašanje deteta bez vikanja
              </h3>
              <div className="space-y-4 font-sans text-brown-light leading-relaxed text-pretty">
                <p>
                  Roditelji mi gotovo svakodnevno kažu istu rečenicu:
                  &bdquo;Kod vas sluša, a kod kuće je potpuno druga priča.&ldquo;
                </p>
                <p>Baš zbog toga nastao je ovaj e-book.</p>
                <p>
                  Kroz godine rada sa decom i razgovora sa roditeljima, želela
                  sam da napravim praktičan vodič koji će pomoći porodicama da
                  uvedu više mira, sigurnosti i saradnje u svakodnevicu bez
                  vikanja, kazni i stalne borbe.
                </p>
                <p>U e-booku vas očekuju:</p>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {ebookBullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-lavender-dark" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Ovaj vodič nije pisan da biste bili savršen roditelj. Napisan
                  je da vam olakša svakodnevicu i pomogne da u svojoj kući imate
                  više mira, povezanosti i sigurnosti.
                </p>
                <div className="rounded-soft bg-cream-white p-5 shadow-soft">
                  <p className="font-serif text-2xl font-semibold text-brown">
                    RUTINE KOJE MENJAJU PONAŠANJE DETETA BEZ VIKANJA
                  </p>
                  <p className="mt-2 text-brown-light">
                    Praktičan vodič za roditelje iz ugla vaspitačice
                  </p>
                  <p className="mt-4 font-hand text-2xl text-lavender-dark">
                    E-book uskoro izlazi.
                  </p>
                </div>
              </div>
            </article>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
