1. Hozz létre három JSON-fájlt users1, users2 és users3 névvel.
   Mindegyik fájl a felhasználók nevét és életkorát tartalmazza az alábbi formában:

{
"users":[
{
"name": "John Doe",
"age": 30,
}
]
}
Mindegyik fájlban legalább 3 felhasználói adat legyen.

Írj egy függvényt, amely paraméterként vár egy HTTP-metódust és egy útvonalat. Ezután XMLHttp-kérést indít az adott erőforrás elérésére az adott metódussal.
Hibakezelés is legyen megvalósítva. Ha az adott erőforrás nem elérhető, próbálja meg még két alkalommal, tehát összesen háromszor elérni azt. Két hívás között legyen 5 másodperc várakozási idő. Ha harmadszorra sem lehet elérni az erőforrást, elég a konzolra kiírni a hibaüzenetet.
Indíts egymás után három kérést mind a 3 JSON-fájl elérésére GET metódussal. A kérések EGYMÁS UTÁN sorban fussanak le, tehát ha az első fájl tartalma elérhető már (lefutott a callback), akkor indítsd a második kérést, és így tovább. A 3 JSON-fájl tartalmát egyetlen JavaScript-objektumba merge-öld össze. Ha bármelyik fájl nem volt elérhető, akkor csak az adott fájl tartalma ne szerepeljen az objektumban, a többié még igen.
Nem szabad callback hell-nek lennie!

2. Készíts egy új verziót az előbbi feladatból. A különbség most csupán annyi, hogy a kérések ne egymás után, hanem egyszerre (“párhuzamosan”) legyenek elküldve.

3. Nézz utána, hogy hogyan lehetne megmérni, hogy az első és a második esetben mennyi a program lefutásának az ideje! Logold ki konzolra táblázatos formában (egy console-metódus lesz ez is, nézz utána), mennyi lesz a futási idő az első és a második megoldás esetében, ha a programot egyszer, tízszer, százszor és ezerszer futtatod le. (A későbbiekben még lesz erről szó.)

Első eset

Második eset

1

10

100

1000
