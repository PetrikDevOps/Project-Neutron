# Project-Neutron

Ez egy online Társas Játék

Ötlet:

    - 1vs1 aréna kvíz játék.
    - "pixel art" stillusban.
    - Kérdések érdekesek de elméletileg az iskolai alap tudás részei.

Játék menete:

    - Játék körökből áll. (Erről többet olvashatsz az "Egy kör menete" alatt).
    - A játék addig tart amig valakinek el nem fogy az élete, vagy fel nem adja a játékot.
    - A győztes játékos KORONGOT kap.

Egy kör menete:

    - Elsőnek el kell döntened mi a stratégiád ezek a következők lehetnek:
        a, Tanulás
        b, Gyógyítás
        c, Támadás
        d, Védekezés
    - Ezek után válaszolnod kell egy kérdésre, ha sikeres a válaszadás a fent választott akció kijátszásra kerül, ha nem sikerült eltalálni a  helyes választ, akkor sajnos ez az akció nem fog kijátszódni.

Játékos tulajdonságai:

    - HP (Élet)
    - SP (Segitség pont)
    - AD (Támadási sebzés)

HP:

    - A HP maximális száma: 7
    - A HP kezdőértéke: 0
    - +1 HP jár minden sikeres "Gyógyitásért"
    - Ez határozza meg egy játékos életerejét

SP:

    - Az SP maximális száma: 3
    - Az SP kezdőértéke: 0
    - +1 SP jár minden sikeres "Tanulásért"
    - Ez határozza meg, hogy hány felhasználható segítségkérésed van
    - Minden egyes feladat könnyités 1 SP-be kerül

AD:

    - Az AD értéke: 2

Feladat Segitség:

    - Minden kérdésnél oldalt megjelenik egy könyv mely abban segitséget nyujt -1 SP-ért
    - Ha számot kell meg akkor egy ugyan olyan nagyságu de számjegyeiben eltérő számot fog beírni,
        (pl.: a helyes válasz a 111 akkor 100-999 között fog egy random számot megadni viszont 99 és 1000 azaz más nagyságú számot bíztos nem add!)
    - Ha 4ből kell a jó választ kiválasztani 2 át satíroz ami nem jó

Védekezés:

    - A "Védekezés" a játék legnehezebb mechanikája ha sikeresen kijátszod vissza ütöd az ellenség támadását ami azt jelenti te nem fogsz sebzést elszenvedni, viszont ő a támadásának a felét el fogja szenvedni azza 1-el csökken a HP-ja

Gyors Játék:

    - Egy random Lobbyhoz csatlakozol.
    - Egy számodra ismeretlen ember ellen fogsz játszani.

Játék a Barátokkal (Lobby Készitése):

    - Ilyen esetben kapni fogsz egy KÓD-ot melyet meg kell osztanod azzal a barátoddal aki ellen szeretnél játszani. (Ez semmilyen plusz energia forrást nem követel meg a gépedtől)

Játék a Barátokkal (Csatlakozás):

    - Barátodtól kapott KÓD-ot kell megadnod.

KORONG:

    - Ez a játék fizetőeszköze, melyel feloldhatod a kinézeteket.
    - Ezeket győzelmekkel szerzed.
