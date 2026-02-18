import Image from "next/image";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Party Up</h1>
          <h2 className="text-2xl font-semibold text-gray-800">ALGEMENE VOORWAARDEN</h2>
        </div>
        <div className="flex-shrink-0">
          <Image src="/logo-full.png" alt="Party-Up Logo" width={240} height={72} priority className="h-20 w-auto" />
        </div>
      </div>

      <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 1 – TOEPASSELIJKHEID</h3>
          <p>
            Deze voorwaarden zijn van toepassing op alle facturen, aanbiedingen, aanvaardingen, overeenkomsten, en andere handelingen tussen huurder en verhuurder, die betrekking hebben op de terbeschikkingstelling van het gehuurde en het in verband daarmee verlenen van diensten of verkopen van goederen door verhuurder aan huurder, behoudens schriftelijk door de verhuurder aanvaarde aanvullingen en/of afwijkingen.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 2 – DUUR VAN DE HUUR</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">2.1</h4>
          <p className="mb-2">
            De huur gaat in, naargelang van het geval:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>op het ogenblik dat huurder of zijn gemachtigde het gehuurde in ontvangst neemt in de magazijnen van verhuurder;</li>
            <li>op het ogenblik dat het gehuurde door de verhuurder aan de transporteur is overgedragen.</li>
          </ul>
          <p className="mb-2">
            Indien is overeengekomen dat het gehuurde door de verhuurder geleverd wordt, dan zorgt de huurder voor een afgevaardigde die de goederen in ontvangst neemt op de afgesproken tijd en plaats. Zoniet is de verhuurder gerechtigd het gehuurde terug mee te nemen, de vervoerskosten en een annulatiekost aan te rekenen.
          </p>
          <p className="mb-2">
            Ook de huurder die nalaat het gehuurde op het afgesproken tijdstip af te halen, betaalt een annulatiekost. Deze wordt als volgt begroot:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>Annulatie tot 72 uur voor het voorziene vertrektijdstip: 30 € + btw.</li>
            <li>Annulatie binnen de 72 uur voor het voorziene vertrektijdstip: het minimum huurbedrag (1 minimale huurperiode), incl. btw.</li>
          </ul>
          <p className="mb-4">
            De door de verhuurder opgegeven afleveringsdata en –tijden zijn louter benaderend en eventuele vertraging levert geen grond op tot ontbinding van de overeenkomst of schadeloosstelling.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">2.2</h4>
          <p className="mb-4">
            De huur eindigt in alle gevallen, op de dag van terugkeer in de magazijnen van de verhuurder, op voorwaarde dat dit geschiedt binnen de openingsuren en tegen aflevering door de verhuurder van een retourbewijs.
            Nochtans heeft de verhuurder het recht, wanneer geen bepaalde einddatum is overeengekomen, om op ieder ogenblik de huur op te zeggen, mits bericht per aangetekende brief tenminste een week vooraf. De termijn van een week gaat in de dag nadat de aangetekende brief ter post is afgegeven. Na verloop van de opzegtermijn is de huur onherroepelijk beëindigd.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">2.3</h4>
          <p className="mb-4">
            Van zodra de huurtijd beëindigd is wordt de huurder van rechtswege en zonder enige aanmaning, geacht ingebreke te zijn het gehuurde terug te bezorgen. De verhuurder heeft vanaf dat ogenblik het recht het gehuurde te laten terughalen, doch is daartoe niet verplicht, zonder een beroep op de Rechter te moeten doen, waar het zich ook bevinde. Alle kosten zoals b.v. het demonteren, opladen, vervoeren, afladen, reinigen enz. zijn volledig ten laste van de huurder. Hij kan verder de huurprijs aanrekenen en nadien wanneer de verhuurder het wenst kan hij de verkoopprijs aanrekenen zonder dat dit afbreuk doet aan de verschuldigde huursom tot op de dag van het aanrekenen van de verkoopprijs. De keuze van de datum van het factureren van de verkoopprijs en het dus eindigen van de huur ligt volledig bij de verhuurder.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">2.4</h4>
          <p>
            De aandacht van de huurder wordt erop gevestigd dat hij nooit eigenaar van het gehuurde kan worden en dat niet-teruggave ervan op het overeengekomen of het hierboven omschreven tijdstip strafbaar is als misbruik van vertrouwen.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 3 – RISICO, GEBREK EN SCHADE</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.1</h4>
          <p className="mb-4">
            Het is de huurder verboden, behoudens schriftelijke toestemming van de verhuurder, het gehuurde onder te verhuren of uit te lenen, of onder welk ander beding ook aan derden ter beschikking te stellen of te overhandigen.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.2</h4>
          <p className="mb-4">
            De huur wordt alleen toegestaan voor het Belgisch grondgebied en iedere verplaatsing van het gehuurde buiten de landsgrenzen is verboden.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.3</h4>
          <p className="mb-2">
            De verhuurder levert de goederen af in perfecte staat van onderhoud. Bij het afhalen of inontvangstneming dient de huurder dit desgewenst te controleren. De afhaling of inontvangstneming door hem of zijn gemachtigde geldt als onwederroepelijke aanvaarding. Bij verzending en wanneer de inontvangstneming niet ter plaatse is gebeurd en de verhuurder geen gebruik heeft gemaakt van zijn recht tot terugname van de goederen, dient de huurder eventueel protest in te brengen per aangetekende brief, die op straffe van verval verzonden dient te worden uiterlijk 24 uur na aflevering op de overeengekomen plaats, zon- en feestdagen niet inbegrepen. De huurder heeft in dat geval echter de bewijslast dat de deficiëntie of de schade niet is ontstaan na de aflevering. Alle verzendingen, ook zij die franco geschieden, gebeuren op risico en op kosten van de koper.
          </p>
          <p className="mb-4">
            Als goederen verkocht worden door verhuurder aan huurder, dan moeten alle klachten voor zichtbare gebreken, ontbrekende goederen of zichtbare niet-conforme levering, onmiddellijk en schriftelijk worden overgemaakt en dit ten laatste 24 uur na ontvangst van de goederen. Alle klachten voor verborgen gebreken moeten onmiddellijk en per aangetekende zending worden overgemaakt en dit uiterlijk acht dagen nadat het gebrek werd ontdekt of redelijkerwijs had kunnen ontdekt zijn. Bij overschrijding van voormelde vervaltermijnen en/of bij enige andere miskenning van het voorafgaande, zal elke mogelijke aansprakelijkheid van verhuurder terzake vervallen, behoudens ingeval van bewezen opzet.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.4</h4>
          <p className="mb-2">
            Na ontdekking van een gebrek, tekort of beschadiging zet huurder het gebruik ervan niet voort.
            Herstelwerkzaamheden worden uitgevoerd door of in opdracht van verhuurder. De kosten van herstel komen voor rekening van de verhuurder, behoudens indien het gebrek, tekort of beschadiging aan de huurder te wijten is, bijvoorbeeld (doch niet uitsluitend) wegens gebruik, onachtzaamheid van de huurder, overmacht of daden van derden. Het bewijs van het tegendeel ligt bij de huurder.
            De tijdsduur nodig voor de verzorging, onderhoud en eventueel noodzakelijk herstelwerkzaamheden, is in de huurperiode begrepen.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.5</h4>
          <p className="mb-4">
            De huurder heeft echter geen recht op schadevergoeding op grond van enige onderbreking in het gebruik van het gehuurde goed en put er ook geen recht uit tot ontbinding van de huurovereenkomst.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.6</h4>
          <p className="mb-2">
            Alleen de huurder draagt gedurende de hele huurtijd, dus ook tijdens het vervoer heen en terug, het risico voor het verlies of beschadiging van het gehuurde. De verhuurder kan het materiaal tot 72 uur voor de ingang van het huurcontract leveren en tot 72 uur na de afmelding ervan ophalen. Ook gedurende die ganse periode draagt de huurder het volledige risico. De huurder of zijn afgevaardigde verbinden zich ertoe de verhuurder binnen de 24 uur op de hoogte te brengen van de volgende feiten:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-2">
            <li>verlies of beschadiging;</li>
            <li>diefstal van het gehuurde voorwerp;</li>
            <li>beschadiging door derden;</li>
            <li>rechterlijk beslag of beslaglegging door schuldeisers;</li>
            <li>faling of gerechtelijk akkoord.</li>
          </ul>
          <p className="mb-2">
            De huurder is aansprakelijk voor de teruggave van het gehuurde in zijn oorspronkelijke staat.
            Onverminderd zijn verhaal op derden, is de huurder aansprakelijk voor ieder verlies, beschadiging, verschil, minderwaarde, enz. in de ruimste zin, zonder fout of opzet van derden, toeval of overmacht te kunnen inroepen tegenover de verhuurder. Terugname door de verhuurder betekent anderzijds geen aanvaarding en sluit een eis tot schadevergoeding niet uit. De verhuurder beschikt over een termijn van 14 dagen na de terugname, zaterdagen, zon- en feestdagen inbegrepen, om aan de huurder zijn bevindingen inzake schade bekend te maken.
            Dit gebeurt door de schadevaststelling door de klant te laten tekenen of bij weigering per aangetekend schrijven, waarin de huurder uitgenodigd wordt, binnen 5 dagen de schade in de magazijnen van de verhuurder tegensprekelijk te komen vaststellen.
            Er is echter geen aangetekend schrijven vereist wanneer de huurder een schadeformulier heeft gekregen in het verhuurcenter of gewoon wanneer de waarborg werd ingehouden.
            Indien de huurder hierop, na verloop van die termijn, niet reageert, dan wordt dit als aanvaarding beschouwd. De verhuurder is dan gemachtigd tot onmiddellijk herstel of vervanging over te gaan en de kosten, evenals alle bijkomende schadeposten aan de huurder aan te rekenen.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.7</h4>
          <p className="mb-4">
            De huurder kan schade tijdens de huurperiode afkopen. Schade-afkoop dekt beschadiging van het huurmaterieel tijdens het laden, lossen, vervoer en gebruik. Uitsluitingen: Diefstal en opzettelijk aangerichte schade, alsook schade die voortvloeit uit het niet naleven van wettelijke verplichtingen en richtlijnen tot goed gebruik. Deze afkoopsom ontheft de huurder niet van zijn verplichting om het materiaal te verzekeren in en naast het verkeer en om zich te schikken naar de geldende wetten en reglementen die een verplichte verzekering opleggen voor gemotoriseerde voertuigen. Voorrijkosten voor interventies op de werf vallen buiten de schadeafkoop. Regio: België, Premie: 10 % van de totale bruto huursom. Vrijstelling: 20 % van het schadebedrag, min. 50 euro (excl. BTW).
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">3.8</h4>
          <p>
            Indien het voertuig is uitgerust met een eigen nummerplaat, geldt een franchise van €500 voor schade aan derden die door de BA verzekering van het voertuig wordt gedekt.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 4 – HUURPRIJS EN BETALINGSVOORWAARDEN</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">4.1</h4>
          <p className="mb-4">
            De huur loopt door op zaterdagen, zon- en feestdagen.
            De huurder dient een som vooruit te betalen, die overeenstemt met de door hem op te geven vermoedelijke duur van de huur. Deze som is opeisbaar op het ogenblik dat de huur ingaat. Indien het gehuurde langer wordt behouden dan de periode waarvoor vooruit betaald werd, dient uiterlijk de eerste dag van de verlenging een nieuw voorschot betaald, gelijk aan de huursom voor de duur van vermoedelijke verlenging. Deze som is opeisbaar op het ogenblik dat de verlenging ingaat.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">4.2</h4>
          <p className="mb-4">
            Bij huurcontracten die langer dan 1 maand lopen, behoudt de verhuurder zich het recht voor eenzijdig de huurprijs aan te passen in de loop van het contract overeenkomstig nieuwe tarieflijsten of indexaties.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">4.3</h4>
          <p className="mb-4">
            Indien een afwijking van bovenvermelde werkwijze uitdrukkelijk en schriftelijk door de verhuurder is toegestaan, wordt de huur gefactureerd op het einde van de maand der aflevering en iedere volgende maand.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">4.4</h4>
          <p className="mb-2">
            Onze facturen zijn contant betaalbaar op onze zetel. Bij niet-betaling van de factuur op de vervaldag, is vanaf de datum van de factuur van rechtswege en zonder voorafgaande ingebrekestelling een verwijlintrest over het opeisbare bedrag verschuldigd ten belope van 1 % per maand waarbij een gedeelte van een maand als volle maand geldt.
            Bij niet-betaling van de factuur op de vervaldag is bovendien van rechtswege en zonder voorafgaande ingebrekestelling een forfaitaire schadevergoeding verschuldigd ten belope van 15 % van het factuurbedrag en dit enkel om reden van deze vertraging, met een minimum van 150 euro.
            Inningskosten zijn in deze forfaitaire schadevergoeding niet begrepen en worden afzonderlijk aangerekend.
            De BTW valt ten laste van de koper of huurder. Alle prijzen worden excl. BTW vermeld.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">4.5</h4>
          <p>
            Onverminderd artikel 4, dient elk protest aangetekend te gebeuren binnen de 8 dagen na facturatiedatum aan de maatschappelijke zetel van de verhuurder.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 5 – BORGSOM</h3>
          <p>
            De borgsom moet contant betaald worden bij of voor het afsluiten van het contract. De borgsom kan door de huurder nooit beschouwd worden als een voorschot op de huur. De verhuurder kan doch moet de borgsom niet aftrekken van alle verschuldigde bedragen. Hij is slechts verplicht tot terugbetaling over te gaan zo de huurder alle verplichtingen heeft voldaan. De waarborg geeft nooit recht op intresten.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 6 – RICHTLIJNEN VOOR HET GEBRUIK</h3>
          <p className="mb-4">
            Naast en bovenop hetgeen onder artikel 3 wordt bepaald, is de huurder verplicht het gehuurde te gebruiken als een goed huurder. Hij verklaart de uitrusting waarvan sprake goed te kennen, geprobeerd en in volmaakte staat van werking te hebben ontvangen. Hij gaat ermee akkoord deze uitrusting te allen tijde voorzichtig, onder zijn volle verantwoordelijkheid, en vakkundig te gebruiken. Hij verklaart de handleiding en uitleg over de werking en de veiligheidsvoorschriften van de toestellen te hebben ontvangen. Zonder dat deze opsomming als volledig is bedoeld, wordt de huurder gewezen op de volgende verplichtingen die hij o.m. dient na te leven met inachtneming van aard en type van het gehuurde toestel.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>De huurder dient het gehuurde doorlopend te inspecteren op de goede werking en tijdig het benodigde dagelijkse of periodieke onderhoud voor het behoud van de goede werking te doen. Dit onderhoud geschiedt op zijn kosten;</li>
            <li>De huurder dient zich te schikken naar alle wettelijke en reglementaire beschikkingen ten aanzien van het gebruik, het in werking stellen of het in bezit hebben van de gehuurde apparatuur, het vermijden van hinder e.d.; vanaf het ingaan van de huur tot aan de teruggave staat hij alleen in voor alle kosten en risico&apos;s die het bezit of het verbruik ervan meebrengen, zoals belastingen, vergunningen, verplichte controle- of beveiligingsmaatregelen, enz. De huurder is verplicht alle wettelijk of reglementair opgelegde controlemaatregelen te laten plaatshebben, zonder enige tussenkomst van de verhuurder daarin.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 7 – ONTBINDING VAN DE HUUR</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">7.1</h4>
          <p className="mb-2">
            De verhuurder heeft het recht om de overeenkomst van rechtswege en zonder voorafgaande ingebrekestelling, met onmiddellijke ingang te beëindigen of ontbonden te verklaren in een of meerdere van de hierna bepaalde gevallen:
          </p>
          <ul className="list-disc pl-6 space-y-1 mb-4">
            <li>wanneer de huurder zijn betalingsverplichtingen, waaronder deze inzake de huur of de waarborg, niet behoorlijk of niet tijdig nakomt of wanneer er duidelijke vermoedens zijn dat de huurder zijn betalingsverplichtingen niet zal nakomen;</li>
            <li>ingeval van enige andere ernstige tekortkoming van de huurder zoals verkeerd gebruik, verplaatsing naar het buitenland, afstand van het gehuurde aan derden, enz.;</li>
            <li>ingeval van faillissement, gerechtelijk akkoord of in vereffeningstelling van huurder;</li>
            <li>ingeval van beslag op de bankrekeningen of andere activa van huurder;</li>
            <li>ingeval van de opzegging van de bank- of andere kredieten van huurder;</li>
            <li>bij protest van handelspapieren van de huurder.</li>
          </ul>
          <p className="mb-4">
            De verhuurder heeft dan het recht van rechtswege en zonder voorafgaande ingebrekestelling, op kosten van de huurder, het gehuurde terug te halen, waar ze zich ook bevinden en er onmiddellijk terug over te beschikken.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">7.2</h4>
          <p>
            Indien de huurovereenkomst beëindigd wordt ten laste van de huurder is de huurder tenminste verplicht, onverminderd het recht van de verhuurder op vergoeding van de bewijsbare schade, de overeengekomen huursom te betalen voor de overeengekomen huurtijd, of de opgegeven vermoedelijke huurtijd. De verhuurder is niet aansprakelijk voor enige schade die de huurder zou lijden als gevolg van de beëindiging/ontbinding van de overeenkomst als bedoeld in 7.1, zoals winstderving e.d.;
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 8 – AANSPRAKELIJKHEID VAN VERHUURDER VOOR SCHADE</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">8.1</h4>
          <p className="mb-4">
            Onverminderd het elders in deze voorwaarden bepaalde, geldt dat de huurder over de gehele huurtijd, aansprakelijk is voor alle schade of hinder die het gehuurde goed, of het gebruik ervan, zelfs indien niet foutief, aan zichzelf of aan derden zou veroorzaken.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">8.2</h4>
          <p className="mb-4">
            Voor het geval de aansprakelijkheid van verhuurder zou worden weerhouden, kan de tussenkomst van verhuurder in de schade in geen geval de bedragen te boven gaan die huurder aan verhuurder dient te betalen binnen het raam van het huurcontract.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">8.3</h4>
          <p className="mb-4">
            Indien zich een gebeurtenis voordoet, waaruit voor huurder schade voortvloeit of naar redelijke verwachting schade zal voortvloeien, waarvoor verhuurder eventueel aansprakelijk is, dient huurder met bekwame spoed, maar in ieder geval binnen 8 dagen na die gebeurtenis, verhuurder van die gebeurtenis schriftelijk in kennis te stellen.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">8.4</h4>
          <p>
            Huurder aanvaardt uitdrukkelijk verhuurder te vrijwaren tegen alle aanspraken van derden tot vergoeding van een door hen geleden schade, in de gevallen waarbij de aansprakelijkheid van verhuurder in huidige voorwaarden werd uitgesloten. Deze vrijwaring omvat ook de kosten, die verhuurder in verband met een aanspraak van een derde moet maken.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 9 – TOEPASSELIJK RECHT EN BEVOEGDE RECHTER</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">9.1</h4>
          <p className="mb-4">
            Op de overeenkomst is uitsluitend Belgisch recht van toepassing.
          </p>

          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">9.2</h4>
          <p>
            Voor alle geschillen die over of naar aanleiding van de door verhuurder uitgebrachte aanbiedingen en/of offertes en/of de huurovereenkomst ontstaan waaronder ook geschillen over het bestaan en de geldigheid van de overeenkomst en de invordering van facturen zijn de rechtbanken alwaar de maatschappelijke zetel van de verhuurder gevestigd is, bevoegd. De verhuurder behoudt zich evenwel het recht voor om het geschil voor elke andere bevoegde rechtbank te brengen.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">ARTIKEL 10 – INTERPRETATIE</h3>
          <h4 className="text-lg font-medium text-gray-900 mt-4 mb-2">10.1</h4>
          <p className="mb-2">
            Loutere artikelaanduidingen in de tussen huurder en verhuurder gesloten overeenkomsten en in de algemene voorwaarden zijn slechts opgenomen voor referentiedoeleinden en zullen op geen enkele wijze de inhoud of uitleg van deze voorwaarden bepalen, beperken of uitbreiden. Zij maken geen onderdeel uit van deze voorwaarden voor welk doel dan ook.
          </p>
          <p>
            Indien een beding of een onderdeel van een beding van deze voorwaarden nietig of niet tegenwerpbaar mocht zijn, of om welke reden ook niet-afdwingbaar zou zijn, blijven de overige bepalingen van deze algemene voorwaarden onverminderd van kracht. In voorkomend geval zullen partijen, te goeder trouw, streven naar een oplossing en/of bepaling die zo nauw mogelijk aansluit bij het beding of deel van beding, dat nietig, niet tegenwerpbaar of niet-afdwingbaar zou zijn verklaard.
          </p>
        </section>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>Power Up BV - Party-Up.be</p>
      </div>
    </div>
  );
}
