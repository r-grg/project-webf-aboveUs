# 👽 AboveUs – UFO Sightings App

AboveUs is een mobiele applicatie gebouwd met **React Native (Expo)** waarin gebruikers UFO-waarnemingen kunnen bekijken en zelf nieuwe meldingen kunnen indienen.  


## 🧩 Functionaliteiten

### 📡 UFO-waarnemingen bekijken
- Overzicht van UFO-sightings opgehaald via een externe API
- Zoekfunctie op getuige en beschrijving
- Sorteren op recent / oudste
- Detailpagina per waarneming

### ⭐ Favorieten
- Waarnemingen markeren als favoriet
- Favorieten worden lokaal opgeslagen met **AsyncStorage**

### 🗺️ Kaartweergave
- Weergave van waarnemingen op een interactieve kaart
- Selecteren van een locatie bij het indienen van een melding

### ✍️ Nieuwe melding indienen
- Formulier met validatie
- Afbeelding toevoegen via **ImagePicker**
- Locatie selecteren op de kaart
- POST-request naar externe API
- Lokale opslag van nieuwe meldingen (fallback)


## 📁 Projectstructuur

```text
src/
├── components/   // Herbruikbare UI-componenten
├── screens/      // App-schermen (Feed, Detail, Map, Create, Favorites)
├── navigation/   // React Navigation (tabs + stack)
├── context/      // SightingsContext (gedeelde state)
├── services/     // API- en AsyncStorage-logica
├── theme/        // React Native Paper theming
├── types/        // TypeScript types
```


## 🌐 Externe Webservice

### API
De applicatie maakt gebruik van de volgende API: https://sampleapis.assimilate.be/ufo/sightings


### GET
- Alle UFO-waarnemingen worden opgehaald via een **GET-request**
- De data wordt getoond in de feed en op de kaart

### POST
- Bij het indienen van een nieuwe melding wordt een **POST-request** verstuurd naar dezelfde API
- Deze API is read-only en accepteert geen persistente POST-acties
- Om dit op te vangen wordt een **fallback-mechanisme** gebruikt:
  - De POST wordt technisch uitgevoerd
  - De nieuwe melding wordt lokaal opgeslagen met **AsyncStorage**
  - De melding verschijnt alsnog in de applicatie


## 💾 Lokale opslag (AsyncStorage)

AsyncStorage wordt gebruikt voor:
- Opslaan van favorieten
- Lokaal opslaan van nieuw toegevoegde UFO-meldingen (fallback na POST)


## 🎨 UI & UX

- UI-bibliotheek: **React Native Paper (Material Design 3)**
- Consistente theming via `paperTheme`
- Typografie:
  - **Orbitron** → titels & headings
  - **Exo 2** → bodytekst

## 🧭 Navigatie

- **Bottom Tab Navigator**
  - Feed
  - Kaart
  - Indienen
  - Favorieten

- **Stack Navigator**
  - Feed → Detail


