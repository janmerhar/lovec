export default {
  // Translations for buliding parts of skeleton
  framework: {
    toolbarNavigation: {
      appName: "Lovec",
    },
    alert: {
      confirmButton: "Potrdi",
      cancelButton: "Prekliči",
    },
  },

  // Custom translations for validation
  custom_validation: {
    min: "Polje mora vsebovati vsaj {min} znakov in vsaj enega od: velike črke, male črke, številko in poseben znak",
    minLowercase: "Polje mora vsebovati vsaj {min} malih črk",
    minUppercase: "Polje mora vsebovati vsaj {min} velikih črk",
    minNumbers: "Polje mora vsebovati vsaj {min} številk",
    minSymbols: "Polje mora vsebovati vsaj {min} posebnih znakov",
    passwordMatch: "Gesli se ne ujemata",
  },

  // Translation by Tabs
  login: {
    tab: {
      header: "Prijava",
      input: {
        email: "Email",
        password: "Geslo",
        submit: "Prijava",
      },
      alert: {
        loginError: "Napačni podatki za prijavo",
      },
    },
  },
  jaga: {
    tab: {
      header: "Jaga",
      headerOptions: {
        active: "Aktivne",
        past: "Pretekle",
        mine: "Moje",
      },
    },
    crud: {
      create: {
        header: "Vnesi jago",
        button: "Dodaj člana",
        success: "Jaga {name} uspešno dodana",
      },
      delete: {
        success: "Jaga {name} uspešno izbrisana",
        failure: "Jaga {name} ni bila izbrisana",
      },
      categories: {
        organizator: "Organizator",
        naziv: "Naziv",
        opis: "Opis",
        udelezeni: "Udeleženi",
        lokacija: "Lokacija",
        zacetek: "Začetek",
      },
    },
  },
  oprema: {
    tab: {
      header: "Oprema",
    },
    crud: {
      create: {
        header: "Dodaj opremo",
        button: "Dodaj opremo",
        success: "Oprema {name} uspešno dodana",
      },
      delete: {
        success: "Oprema {name} uspešno izbrisana",
        failure: "Oprema {name} ni bila izbrisana",
      },
      categories: {
        naziv: "Naziv",
        tip: "Tip",
        stanje: "Stanje",
      },
    },
  },
  pripravniki: {
    tab: {
      header: "Pripravniki",
    },
    crud: {
      create: {
        header: "Vnesi pripravnika",
        button: "Vnesi",
        success: "Dnevnik za {name} uspešno dodan",
      },
      categories: {
        datum: "Datum",
        ure: "Ure",
        opis: "Opis",
        delo: "Delo",
      },
    },
  },
  mentor: {
    tab: {
      header: "Dnevniki",
    },
  },
  vplenDatum: {
    tab: {
      header: "Vpleni datum",
    },
    crud: {
      create: {
        header: "Vnesi vplen",
        button: "Vpleni",
        success: "Vplen {name} uspešno dodan",
      },
      delete: {
        success: "Vplen {name} uspešno izbrisan",
        failure: "Vplen {name} ni bila izbrisan",
      },
      categories: {
        kooridnate: "Koordinate",
        zival: "Žival",
        teza: "Teža",
        datum: "Datum",
        bolezni: "Bolezni",
      },
    },
  },
  opazovalnice: {
    create: {},
    delete: {
      success: "Opazovalnica {name} uspešno izbrisana",
      failure: "Opazovalnica {name} ni bila izbrisana",
    },
  },
  izkaznica: {
    tab: {
      header: "Izkaznica",
      sections: {
        personalData: "Osebni podatki",
        mentor: "Mentor",
        apprentice: "Pripravnik",
        apprentices: "Pripravniki",
        preferences: "Preference",
        theme: "Tema",
        language: "Jezik",
      },
      logout: "Odjava",
    },
    crud: {
      create: {
        header: "Vnesi izkaznico",
        button: "Vnesi",
        success: "Izkaznica {name} uspešno dodana",
      },
      delete: {
        success: "Izkaznica {name} uspešno izbrisana",
        failure: "Izkaznica {name} ni bila izbrisana",
      },
      categories: {
        ime: "Ime",
        priimek: "Priimek",
        druzina: "Družina",
        role: "Vloga",
        mentor: "Mentor",
        pripravniki: "Pripravniki",
        preference: "Preference",
      },
    },
  },

  // Admin tabs
  admin_druzine: {
    tab: {
      header: "Družine",
      crud: {
        create: {
          header: "Dodaj družino",
          button: "Dodaj",
          success: "Družina {name} uspešno dodana",
        },
        delete: {
          header: "Izbriši družino",
          message: "Ali ste prepričani, da želite izbrisati družino {name}?",
          success: "Družina {name} uspešno izbrisana",
          failure: "Družina {name} ni bila izbrisana",
        },
        categories: {
          ime: "Naziv",
          revirji: "Revirji",
          clani: "Člani",
        },
      },
    },
  },
  admin_druzina_id: {
    tab: {
      header: "Družina",
      crud: {
        update: {
          header: "Spremeni družino",
          button: "Spremeni",
          success: "Družina uspešno posodobljena",
        },
        categories: {
          naziv: "Naziv",
          opis: "Opis",
          clan: "Član",
        },
      },
      sections: {
        clan: "Član",
      },
    },
  },
  admin_sistem: {
    tab: {
      header: "Sistem",
      crud: {
        update: {
          header: "Spremeni sistem",
          button: "Spremeni",
          success: "Sistem uspešno posodobljen",
        },
        categories: {
          datum: "Revizija",
          PAGE_SIZE: "Velikost strani",
          JAGA_MAX_MEMBERS: "Maksimalno število članov jage",
          OBISK_MAX_LENGTH: "Maksimalna dolžina obiska",
          USER_OBISKS_MAX_LENGTH: "Maksimalna dolžina obiskov uporabnika",
        },
      },
      sections: {
        spremenljivke: "Spremenljivke",
      },
    },
  },
  admin_uporabniki: {
    tab: {
      header: "Uporabniki",
      search: "Poišči uporabnika",
      crud: {
        create: {
          header: "Dodaj uporabnika",
          button: "Dodaj",
          success: "Uporabnik {name} uspešno dodan",
        },
        delete: {
          header: "Izbriši uporabnika",
          message: "Ali ste prepričani, da želite izbrisati uporabnika {name}?",
          success: "Uporabnik {name} uspešno izbrisan",
          failure: "Uporabnik {name} ni bil izbrisan",
        },
        categories: {
          ime: "Ime",
          priimek: "Priimek",
          email: "Email",
          geslo: "Geslo",
          gesloRepeat: "Potrdi geslo",
          role: "Vloga",
        },
      },
    },
  },
}
