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
          naziv: "Naziv",
          opis: "Opis",
          clan: "Član",
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
}
