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
    InfiniteScrollComponent: {
      fetching: "Nalagam...",
    },
    TabNoElements: {
      noElements: "Ni elementov",
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
      header: "Lovi",
      headerOptions: {
        active: "Aktivni",
        past: "Pretekli",
        mine: "Moji",
      },
    },
    crud: {
      create: {
        header: "Vnesi lov",
        button: "Dodaj člana",
        success: "Jaga {name} uspešno dodana",
      },
      delete: {
        success: "Lov {name} uspešno izbrisana",
        failure: "Lov {name} ni bila izbrisana",
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
      header: "Dnevniki",
    },
    crud: {
      create: {
        header: "Vnesi dnevnik",
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
  vpleni: {
    tab: {
      header: "Zgodovina uplenov",
    },
  },
  vplenDatum: {
    tab: {
      header: "Upleni datum",
    },
    crud: {
      create: {
        header: "Vnesi uplen",
        button: "Upleni",
        success: "Uplen {name} uspešno dodan",
      },
      delete: {
        success: "Uplen {name} uspešno izbrisan",
        failure: "Uplen {name} ni bila izbrisan",
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
  zemljevid: {
    tab: {
      header: "Zemljevid",
      crud: {
        create: {
          header: "Dodaj opazovalnico",
          button: "Dodaj",
          success: "Opazovalnica {name} uspešno dodana",
        },
        delete: {},
      },
    },
  },
  obisk: {
    tab: {
      header: "Zasedenost",
      crud: {
        create: {
          header: "Dodaj obisk",
          button: "Dodaj",
          success: "Obisk {name} uspešno dodan",
        },
        delete: {
          success: "Obisk uspešno izbrisan",
          failure: "Obisk ni bil izbrisan",
        },
      },
      sections: {
        zasedenost: "Zasedenost",
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
          JAGA_MAX_MEMBERS: "Maksimalno število članov lova",
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

  admin_uporabnik_id: {
    tab: {
      header: "Uporabnik",
      sections: {
        personalData: "Osebni podatki",
        mentor: "Mentor",
        apprentice: "Pripravnik",
        apprentices: "Pripravniki",
        preferences: "Preference",
        theme: "Tema",
        language: "Jezik",
        pages: "Strani",
        jage: "Jage",
        dnevniki_pripravnik: "Dnevniki",
        dnevniki_mentor: "Dnevniki pripravnikov",
        obiski: "Obiski",
        vpleni: "Upleni",
        oprema: "Oprema",
      },
      logout: "Odjava",
    },
    crud: {
      create: {
        header: "Vnesi uporabnika",
        button: "Vnesi",
        addPripravnik: "Dodaj pripravnika",
        success: "Uporabnik {name} uspešno dodan",
      },
      update: {
        header: "Spremeni uporabnika",
        button: "Spremeni",
        success: "Uporabnik uspešno posodobljen",
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
  admin_uporabnik_oprema: {
    tab: {
      header: "Oprema",
    },
    crud: {
      delete: {
        header: "Izbriši opremo",
        message: "Ali ste prepričani, da želite izbrisati opremo {name}?",
        success: "Oprema {name} uspešno izbrisana",
        failure: "Oprema {name} ni bila izbrisana",
      },
    },
  },
  admin_pripravnik_dnevniki: {
    tab: {
      header: "Dnevniki",
    },
  },
  admin_uporabnik_vpleni: {
    tab: {
      header: "Upleni",
    },
  },
  admin_uporabnik_jage: {
    tab: {
      header: "Jage",
      headerOptions: {
        active: "Aktivne",
        past: "Pretekle",
      },
    },
  },
  admin_uporabnik_obiski: {
    tab: {
      header: "Obiski",
      sections: {
        obiski: "Obiski",
      },
    },
    crud: {
      delete: {
        success: "Obisk uspešno izbrisan",
        failure: "Obisk ni bil izbrisan",
      },
    },
  },
  admin_zemljevid: {
    tab: {
      header: "Zemljevid",
    },
    obiski: {
      header: "Obiski",
      sections: {
        zasedenost: "Zasedenost",
        zgodovina: "Ogled drugih obiskov",
      },
    },
  },
  admin_opazovalnica: {
    crud: {
      create: {
        header: "Dodaj opazovalnico",
        button: "Dodaj",
        success: "Opazovalnica {name} uspešno dodana",
      },
      delete: {
        header: "Izbriši opazovalnico",
        message: "Ali ste prepričani, da želite izbrisati opazovalnico?",
        success: "Opazovalnica {name} uspešno izbrisana",
        failure: "Opazovalnica {name} ni bila izbrisana",
      },
      categories: {
        ime: "Ime",
        kapaciteta: "Kapaciteta",
        prespanje: "Prespanje",
        koordinate: "Koordinate",
      },
    },
  },
  admin_revir: {
    crud: {
      create: {
        header: "Dodaj revir",
        button: "Dodaj",
        success: "Revir {name} uspešno dodan",
      },
      categories: {
        ime: "Ime",
        koordinate: "Koordinate",
        druzina: "Družina",
        empty: "Ni družine",
      },
    },
  },
  admin_zemljevid_obiski: {
    tab: {
      header: "Obiski",
      sections: {
        obiski: "Obiski",
      },
    },
    crud: {
      delete: {
        success: "Obisk uspešno izbrisan",
        failure: "Obisk ni bil izbrisan",
      },
    },
  },
}
