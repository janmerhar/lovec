export default {
  // Translations for buliding parts of skeleton
  framework: {
    toolbarNavigation: {
      appName: "Lovec",
    },
    alert: {
      confirmButton: "Confirm",
      cancelButton: "Cancel",
    },
    InfiniteScrollComponent: {
      fetching: "Loading...",
    },
    TabNoElements: {
      noElements: "No elements",
    },
  },

  // Custom translations for validation
  custom_validation: {
    min: "Field must contain at least {min} characters, and at least one of: uppercase letter, lowercase letter, number and special character",
    minLowercase: "Field must contain at least {min} lowercase letters",
    minUppercase: "Field must contain at least {min} uppercase letters",
    minNumbers: "Field must contain at least {min} numbers",
    minSymbols: "Field must contain at least {min} special characters",
    passwordMatch: "Passwords do not match",
  },

  // Translation by Tabs
  login: {
    tab: {
      header: "Login",
      input: {
        email: "Email",
        password: "Password",
        submit: "Login",
      },
      alert: {
        loginError: "Incorrect email or password",
      },
    },
  },
  jaga: {
    tab: {
      header: "Hunts",
      headerOptions: {
        active: "Active",
        past: "Past",
        mine: "Mine",
      },
    },
    crud: {
      create: {
        header: "Add hunt",
        button: "Add hunter",
        success: "Hunt {name} added successfully",
      },
      delete: {
        success: "Hunt {name} deleted successfully",
        failure: "Hunt {name} failed to delete",
      },
      categories: {
        organizator: "Organizer",
        naziv: "Name",
        opis: "Description",
        udelezeni: "Participants",
        lokacija: "Location",
        zacetek: "Start",
      },
    },
  },
  oprema: {
    tab: {
      header: "Equipment",
    },
    crud: {
      create: {
        header: "New equipment",
        button: "Add equipment",
        success: "Equipment {name} added successfully",
      },
      delete: {
        success: "Equipment {name} successfully deleted",
        failure: "Equipment {name} failed to delete",
      },
      categories: {
        naziv: "Name",
        tip: "Type",
        stanje: "Condition",
      },
    },
  },
  pripravniki: {
    tab: {
      header: "Logs",
    },
    crud: {
      create: {
        header: "New log",
        button: "Add log",
        success: "Log {name} added successfully",
      },
      categories: {
        datum: "Date",
        ure: "Hours",
        opis: "Description",
        delo: "Task",
      },
    },
  },
  mentor: {
    tab: {
      header: "Logs",
    },
  },
  vpleni: {
    tab: {
      header: "Catch history",
    },
  },
  vplenDatum: {
    tab: {
      header: "Catch date",
    },
    crud: {
      create: {
        header: "Insert catch",
        button: "Catches",
        success: "Catch {name} added successfully",
      },
      delete: {
        success: "Catch {name} successfully deleted",
        failure: "Catch {name} failed to delete",
      },
      categories: {
        kooridnate: "Coordinates",
        zival: "Animal",
        teza: "Weight",
        datum: "Date",
        bolezni: "Diseases",
      },
    },
  },
  opazovalnice: {
    create: {},
    delete: {
      success: "Observatory {name} deleted successfully",
      failure: "Observatory {name} failed to delete",
    },
  },
  izkaznica: {
    tab: {
      header: "ID",
      sections: {
        personalData: "Personal data",
        mentor: "Mentor",
        apprentice: "Apprentice",
        apprentices: "Apprentices",
        preferences: "Preferences",
        theme: "Theme",
        language: "Language",
      },
      logout: "Logout",
    },
    crud: {
      create: {
        header: "New ID",
        button: "Add ID",
        success: "ID {name} added successfully",
      },
      delete: {
        success: "ID {name} deleted successfully",
        failure: "ID {name} failed to delete",
      },
      categories: {
        ime: "Name",
        priimek: "Surname",
        druzina: "Family",
        role: "Role",
        mentor: "Mentor",
        pripravniki: "Apprentices",
        preference: "Preferences",
      },
    },
  },
  zemljevid: {
    tab: {
      header: "Map",
      crud: {
        create: {
          header: "New observatory",
          button: "Add observatory",
          success: "Observatory {name} added successfully",
        },
        delete: {},
      },
    },
  },
  obisk: {
    tab: {
      header: "Reservations",
      crud: {
        create: {
          header: "New reservation",
          button: "Add reservation",
          success: "Reservation {name} added successfully",
        },
        delete: {
          success: "Reservation successfully deleted",
          failure: "Reservation failed to delete",
        },
      },
      sections: {
        zasedenost: "Occupancy",
      },
    },
  },

  // Admin tabs
  admin_druzine: {
    tab: {
      header: "Families",
      crud: {
        create: {
          header: "New family",
          button: "Add family",
          success: "Family {name} added successfully",
        },
        delete: {
          header: "Delete family",
          message: "Are you sure you want to delete family {name}",
          success: "Family {name} deleted successfully",
          failure: "Family {name} failed to delete",
        },
        categories: {
          ime: "Name",
          revirji: "Areas",
          clani: "Members",
        },
      },
    },
  },
  admin_druzina_id: {
    tab: {
      header: "Family",
      crud: {
        update: {
          header: "Update family",
          button: "Update",
          success: "Family updates successfully",
        },
        categories: {
          naziv: "Name",
          opis: "Description",
          clan: "Members",
        },
      },
      sections: {
        clan: "Members",
      },
    },
  },
  admin_sistem: {
    tab: {
      header: "System",
      crud: {
        update: {
          header: "Update system",
          button: "Update",
          success: "System update successfully",
        },
        categories: {
          datum: "Date",
          PAGE_SIZE: "Page size",
          JAGA_MAX_MEMBERS: "Max hunt participants",
          OBISK_MAX_LENGTH: "Max reservation length",
          USER_OBISKS_MAX_LENGTH: "Max user daily reservations",
        },
      },
      sections: {
        spremenljivke: "System variables",
      },
    },
  },
  admin_uporabniki: {
    tab: {
      header: "Users",
      search: "Find user",
      crud: {
        create: {
          header: "New user",
          button: "Add user",
          success: "User {name} added successfully",
        },
        delete: {
          header: "Delete user",
          message: "Are you sure you want to delete user {name}?",
          success: "User {name} successfully deleted",
          failure: "User {name} was not deleted",
        },
        categories: {
          ime: "Name",
          priimek: "Surname",
          email: "Email",
          geslo: "Password",
          gesloRepeat: "Confirm password",
          role: "Role",
        },
      },
    },
  },

  admin_uporabnik_id: {
    tab: {
      header: "User",
      sections: {
        personalData: "Personal data",
        mentor: "Mentor",
        apprentice: "Apprentice",
        apprentices: "Apprentices",
        preferences: "Preferences",
        theme: "Theme",
        language: "Language",
        pages: "Pages",
        jage: "Hunts",
        dnevniki_pripravnik: "Logs",
        dnevniki_mentor: "Apprentice logs",
        obiski: "Visits",
        vpleni: "Catches history",
        oprema: "Equipment",
      },
      logout: "Logout",
    },
    crud: {
      create: {
        header: "Add user",
        button: "Add",
        addPripravnik: "Add apprentice",
        success: "User {name} added successfully",
      },
      update: {
        header: "Update user",
        button: "Update",
        success: "User updated successfully",
      },
      categories: {
        ime: "Name",
        priimek: "Surname",
        druzina: "Family",
        role: "Role",
        mentor: "Mentor",
        pripravniki: "Apprentices",
        preference: "Preferences",
      },
    },
  },
  admin_uporabnik_oprema: {
    tab: {
      header: "Equipment",
    },
    crud: {
      delete: {
        header: "Delete equipment",
        message: "Are you sure you want to delete equipment {name}?",
        success: "Equipment {name} successfully deleted",
        failure: "Equipment {name} failed to delete",
      },
    },
  },
  admin_pripravnik_dnevniki: {
    tab: {
      header: "Logs",
    },
  },
  admin_uporabnik_vpleni: {
    tab: {
      header: "Catch history",
    },
  },
  admin_uporabnik_jage: {
    tab: {
      header: "Hunts",
      headerOptions: {
        active: "Active",
        past: "Past",
      },
    },
  },
  admin_uporabnik_obiski: {
    tab: {
      header: "Reservations",
      sections: {
        obiski: "Visits",
      },
    },
    crud: {
      delete: {
        success: "Reservation successfully deleted",
        failure: "Reservation failed to delete",
      },
    },
  },
  admin_zemljevid: {
    tab: {
      header: "Map",
    },
    obiski: {
      header: "Reservations",
      sections: {
        zasedenost: "Availability",
        zgodovina: "History",
      },
    },
  },
  admin_opazovalnica: {
    crud: {
      create: {
        header: "Add observatory",
        button: "Add",
        success: "Observatory {name} added successfully",
      },
      delete: {
        header: "Delete observatory",
        message: "Are you sure you want to delete observatory {name}?",
        success: "Observatory {name} successfully deleted",
        failure: "Observatory {name} failed to delete",
      },
      categories: {
        ime: "Name",
        kapaciteta: "Capacity",
        prespanje: "Overnight stay",
        koordinate: "Coordinates",
      },
    },
  },
  admin_revir: {
    crud: {
      create: {
        header: "Add area",
        button: "Add",
        success: "Area {name} added successfully",
      },
      categories: {
        ime: "Name",
        koordinate: "Coordinates",
        druzina: "Family",
        empty: "No family",
      },
    },
  },
  admin_zemljevid_obiski: {
    tab: {
      header: "Reservations",
      sections: {
        obiski: "Visits",
      },
    },
    crud: {
      delete: {
        success: "Reservation successfully deleted",
        failure: "Reservation failed to delete",
      },
    },
  },
}
