// Set 17 unit data scraped from tactics.tools/info/set-update
// Source: "Set 17 Update.html"
//
// URL patterns:
//   tile:    https://ap.tft.tools/img/new17/face_full/TFT17_{Name}.jpg
//   icon:    https://cdn.metatft.com/file/metatft/champions/tft17_{name}.png
//   splash:  https://cdn.metatft.com/file/metatft/championsplashes/tft17_{name}.png
//   trait:   https://cdn.metatft.com/file/metatft/traits/{traitslug}.png

export const set17_pool = {
    "Aatrox": {
        cost: 1,
        name: "Aatrox",
        copies_in_pool: 30,
        synergies: ["N.O.V.A.", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Aatrox.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_aatrox.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_aatrox.png",
        traitIcons: {"N.O.V.A.": "https://cdn.metatft.com/file/metatft/traits/nova.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Attack Tank",
        range: 1,
        mana: "30/90",
        ability: "Stellar Slash"
    },
    "Briar": {
        cost: 1,
        name: "Briar",
        copies_in_pool: 30,
        synergies: ["Anima", "Primordian", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Briar.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_briar.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_briar.png",
        traitIcons: {"Anima": "https://cdn.metatft.com/file/metatft/traits/anima.png", "Primordian": "https://cdn.metatft.com/file/metatft/traits/primordian.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Attack Fighter",
        range: 1,
        mana: "0/40",
        ability: "Fish Frenzy"
    },
    "Caitlyn": {
        cost: 1,
        name: "Caitlyn",
        copies_in_pool: 30,
        synergies: ["N.O.V.A.", "Fateweaver"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Caitlyn.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_caitlyn.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_caitlyn.png",
        traitIcons: {"N.O.V.A.": "https://cdn.metatft.com/file/metatft/traits/nova.png", "Fateweaver": "https://cdn.metatft.com/file/metatft/traits/fateweaver.png"},
        role: "Attack Specialist",
        range: 4,
        mana: null,
        ability: "Aim for the Head"
    },
    "Cho'Gath": {
        cost: 1,
        name: "Cho'Gath",
        copies_in_pool: 30,
        synergies: ["Dark Star", "Brawler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_ChoGath.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_chogath.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_chogath.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png"},
        role: "Magic Tank",
        range: 1,
        mana: "30/70",
        ability: "Accretion"
    },
    "Ezreal": {
        cost: 1,
        name: "Ezreal",
        copies_in_pool: 30,
        synergies: ["Timebreaker", "Sniper"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Ezreal.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_ezreal.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_ezreal.png",
        traitIcons: {"Timebreaker": "https://cdn.metatft.com/file/metatft/traits/timebreaker.png", "Sniper": "https://cdn.metatft.com/file/metatft/traits/sniper.png"},
        role: "Attack Caster",
        range: 4,
        mana: "0/30",
        ability: "Temporal Shot"
    },
    "Leona": {
        cost: 1,
        name: "Leona",
        copies_in_pool: 30,
        synergies: ["Arbiter", "Vanguard"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Leona.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_leona.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_leona.png",
        traitIcons: {"Arbiter": "https://cdn.metatft.com/file/metatft/traits/arbiter.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png"},
        role: "Magic Tank",
        range: 1,
        mana: "40/100",
        ability: "Shield of Daybreak"
    },
    "Lissandra": {
        cost: 1,
        name: "Lissandra",
        copies_in_pool: 30,
        synergies: ["Dark Star", "Shepherd", "Replicator"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Lissandra.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_lissandra.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_lissandra.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png", "Replicator": "https://cdn.metatft.com/file/metatft/traits/replicator.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/30",
        ability: "Dark Matter"
    },
    "Nasus": {
        cost: 1,
        name: "Nasus",
        copies_in_pool: 30,
        synergies: ["Space Groove", "Vanguard"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Nasus.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_nasus.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_nasus.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png"},
        role: "Magic Tank",
        range: 1,
        mana: "60/120",
        ability: "Groovin' Susan"
    },
    "Poppy": {
        cost: 1,
        name: "Poppy",
        copies_in_pool: 30,
        synergies: ["Meeple", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Poppy.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_poppy.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_poppy.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Magic Tank",
        range: 1,
        mana: "30/100",
        ability: "Huddle Up!"
    },
    "Rek'Sai": {
        cost: 1,
        name: "Rek'Sai",
        copies_in_pool: 30,
        synergies: ["Primordian", "Brawler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_RekSai.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_reksai.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_reksai.png",
        traitIcons: {"Primordian": "https://cdn.metatft.com/file/metatft/traits/primordian.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png"},
        role: "Magic Tank",
        range: 1,
        mana: "50/110",
        ability: "Upheaval"
    },
    "Talon": {
        cost: 1,
        name: "Talon",
        copies_in_pool: 30,
        synergies: ["Stargazer", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Talon.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_talon.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_talon.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Attack Assassin",
        range: 1,
        mana: "0/30",
        ability: "Diviner's Judgement"
    },
    "Teemo": {
        cost: 1,
        name: "Teemo",
        copies_in_pool: 30,
        synergies: ["Space Groove", "Shepherd"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Teemo.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_teemo.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_teemo.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png"},
        role: "Magic Marksman",
        range: 4,
        mana: "0/50",
        ability: "Double Time"
    },
    "Twisted Fate": {
        cost: 1,
        name: "Twisted Fate",
        copies_in_pool: 30,
        synergies: ["Stargazer", "Fateweaver"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_TwistedFate.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_twistedfate.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_twistedfate.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Fateweaver": "https://cdn.metatft.com/file/metatft/traits/fateweaver.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/50",
        ability: "Fate's Gambit"
    },
    "Veigar": {
        cost: 1,
        name: "Veigar",
        copies_in_pool: 30,
        synergies: ["Meeple", "Replicator"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Veigar.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_veigar.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_veigar.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Replicator": "https://cdn.metatft.com/file/metatft/traits/replicator.png"},
        role: "Magic Caster",
        range: 4,
        mana: "10/50",
        ability: "Meepteor Shower"
    },
    "Akali": {
        cost: 2,
        name: "Akali",
        copies_in_pool: 25,
        synergies: ["N.O.V.A.", "Marauder"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Akali.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_akali.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_akali.png",
        traitIcons: {"N.O.V.A.": "https://cdn.metatft.com/file/metatft/traits/nova.png", "Marauder": "https://cdn.metatft.com/file/metatft/traits/marauder.png"},
        role: "Attack Fighter",
        range: 1,
        mana: "0/30",
        ability: "Star Strike"
    },
    "Bel'Veth": {
        cost: 2,
        name: "Bel'Veth",
        copies_in_pool: 25,
        synergies: ["Primordian", "Challenger", "Marauder"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Belveth.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_belveth.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_belveth.png",
        traitIcons: {"Primordian": "https://cdn.metatft.com/file/metatft/traits/primordian.png", "Challenger": "https://cdn.metatft.com/file/metatft/traits/challenger.png", "Marauder": "https://cdn.metatft.com/file/metatft/traits/marauder.png"},
        role: "Attack Fighter",
        range: 2,
        mana: "0/50",
        ability: "Tidal Slashes"
    },
    "Gnar": {
        cost: 2,
        name: "Gnar",
        copies_in_pool: 25,
        synergies: ["Meeple", "Sniper"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Gnar.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_gnar.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_gnar.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Sniper": "https://cdn.metatft.com/file/metatft/traits/sniper.png"},
        role: "Attack Specialist",
        range: 4,
        mana: "0/5",
        ability: "Slingshot Mane"
    },
    "Gragas": {
        cost: 2,
        name: "Gragas",
        copies_in_pool: 25,
        synergies: ["Psionic", "Brawler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Gragas.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_gragas.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_gragas.png",
        traitIcons: {"Psionic": "https://cdn.metatft.com/file/metatft/traits/psionic.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png"},
        role: "Magic Tank",
        range: 1,
        mana: "30/80",
        ability: "Chemical Rage"
    },
    "Gwen": {
        cost: 2,
        name: "Gwen",
        copies_in_pool: 25,
        synergies: ["Space Groove", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Gwen.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_gwen.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_gwen.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Magic Assassin",
        range: 2,
        mana: "0/30",
        ability: "Dance n' Dice"
    },
    "Jax": {
        cost: 2,
        name: "Jax",
        copies_in_pool: 25,
        synergies: ["Stargazer", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Jax.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_jax.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_jax.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Magic Tank",
        range: 1,
        mana: "10/70",
        ability: "Counter Star-ike"
    },
    "Jinx": {
        cost: 2,
        name: "Jinx",
        copies_in_pool: 25,
        synergies: ["Anima", "Challenger"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Jinx.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_jinx.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_jinx.png",
        traitIcons: {"Anima": "https://cdn.metatft.com/file/metatft/traits/anima.png", "Challenger": "https://cdn.metatft.com/file/metatft/traits/challenger.png"},
        role: "Attack Marksman",
        range: 4,
        mana: "20/80",
        ability: "Fishbones!"
    },
    "Meepsie": {
        cost: 2,
        name: "Meepsie",
        copies_in_pool: 25,
        synergies: ["Meeple", "Shepherd", "Voyager"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Meepsie.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_meepsie.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_meepsie.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png", "Voyager": "https://cdn.metatft.com/file/metatft/traits/voyager.png"},
        role: "Magic Tank",
        range: 1,
        mana: "50/100",
        ability: "Meep Impact"
    },
    "Milio": {
        cost: 2,
        name: "Milio",
        copies_in_pool: 25,
        synergies: ["Timebreaker", "Fateweaver"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Milio.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_milio.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_milio.png",
        traitIcons: {"Timebreaker": "https://cdn.metatft.com/file/metatft/traits/timebreaker.png", "Fateweaver": "https://cdn.metatft.com/file/metatft/traits/fateweaver.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/30",
        ability: "ULTRA MEGA TIME KICK"
    },
    "Mordekaiser": {
        cost: 2,
        name: "Mordekaiser",
        copies_in_pool: 25,
        synergies: ["Dark Star", "Channeler", "Vanguard"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Mordekaiser.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_mordekaiser.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_mordekaiser.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Channeler": "https://cdn.metatft.com/file/metatft/traits/channeler.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png"},
        role: "Magic Tank",
        range: 1,
        mana: "20/80",
        ability: "Indestructible"
    },
    "Pantheon": {
        cost: 2,
        name: "Pantheon",
        copies_in_pool: 25,
        synergies: ["Timebreaker", "Brawler", "Replicator"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Pantheon.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_pantheon.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_pantheon.png",
        traitIcons: {"Timebreaker": "https://cdn.metatft.com/file/metatft/traits/timebreaker.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png", "Replicator": "https://cdn.metatft.com/file/metatft/traits/replicator.png"},
        role: "Attack Tank",
        range: 1,
        mana: "20/80",
        ability: "Advanced Defences"
    },
    "Pyke": {
        cost: 2,
        name: "Pyke",
        copies_in_pool: 25,
        synergies: ["Psionic", "Voyager"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Pyke.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_pyke.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_pyke.png",
        traitIcons: {"Psionic": "https://cdn.metatft.com/file/metatft/traits/psionic.png", "Voyager": "https://cdn.metatft.com/file/metatft/traits/voyager.png"},
        role: "Attack Assassin",
        range: 1,
        mana: "0/40",
        ability: "Marked for Death"
    },
    "Zoe": {
        cost: 2,
        name: "Zoe",
        copies_in_pool: 25,
        synergies: ["Arbiter", "Channeler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Zoe.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_zoe.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_zoe.png",
        traitIcons: {"Arbiter": "https://cdn.metatft.com/file/metatft/traits/arbiter.png", "Channeler": "https://cdn.metatft.com/file/metatft/traits/channeler.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/50",
        ability: "Paddle Star"
    },
    "Aurora": {
        cost: 3,
        name: "Aurora",
        copies_in_pool: 18,
        synergies: ["Anima", "Voyager"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Aurora.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_aurora.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_aurora.png",
        traitIcons: {"Anima": "https://cdn.metatft.com/file/metatft/traits/anima.png", "Voyager": "https://cdn.metatft.com/file/metatft/traits/voyager.png"},
        role: "Magic Caster",
        range: 4,
        mana: "20/80",
        ability: "Hopped-Up Hacks"
    },
    "Diana": {
        cost: 3,
        name: "Diana",
        copies_in_pool: 18,
        synergies: ["Arbiter", "Challenger"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Diana.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_diana.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_diana.png",
        traitIcons: {"Arbiter": "https://cdn.metatft.com/file/metatft/traits/arbiter.png", "Challenger": "https://cdn.metatft.com/file/metatft/traits/challenger.png"},
        role: "Magic Fighter",
        range: 1,
        mana: "0/50",
        ability: "Pale Cascade"
    },
    "Fizz": {
        cost: 3,
        name: "Fizz",
        copies_in_pool: 18,
        synergies: ["Meeple", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Fizz.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_fizz.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_fizz.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Magic Assassin",
        range: 1,
        mana: "0/20",
        ability: "Meep Bait"
    },
    "Illaoi": {
        cost: 3,
        name: "Illaoi",
        copies_in_pool: 18,
        synergies: ["Anima", "Vanguard", "Shepherd"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Illaoi.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_illaoi.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_illaoi.png",
        traitIcons: {"Anima": "https://cdn.metatft.com/file/metatft/traits/anima.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png"},
        role: "Magic Tank",
        range: 1,
        mana: "40/100",
        ability: "Test of Spirit"
    },
    "Kai'Sa": {
        cost: 3,
        name: "Kai'Sa",
        copies_in_pool: 18,
        synergies: ["Dark Star", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Kaisa.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_kaisa.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_kaisa.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Attack Caster",
        range: 4,
        mana: "0/50",
        ability: "Bullet Cluster"
    },
    "Lulu": {
        cost: 3,
        name: "Lulu",
        copies_in_pool: 18,
        synergies: ["Stargazer", "Replicator"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Lulu.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_lulu.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_lulu.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Replicator": "https://cdn.metatft.com/file/metatft/traits/replicator.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/60",
        ability: "It's Raining Stars"
    },
    "Maokai": {
        cost: 3,
        name: "Maokai",
        copies_in_pool: 18,
        synergies: ["N.O.V.A.", "Brawler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Maokai.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_maokai.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_maokai.png",
        traitIcons: {"N.O.V.A.": "https://cdn.metatft.com/file/metatft/traits/nova.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png"},
        role: "Magic Tank",
        range: 1,
        mana: "30/100",
        ability: "Grasp of Convergence"
    },
    "Miss Fortune": {
        cost: 3,
        name: "Miss Fortune",
        copies_in_pool: 18,
        synergies: ["Gun Goddess"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_MissFortune.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_missfortune.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_missfortune.png",
        traitIcons: {"Gun Goddess": "https://cdn.metatft.com/file/metatft/traits/gungoddess.png"},
        role: "Attack Caster",
        range: 4,
        mana: "0/100",
        ability: "Gun Goddess Arsenal"
    },
    "Ornn": {
        cost: 3,
        name: "Ornn",
        copies_in_pool: 18,
        synergies: ["Space Groove", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Ornn.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_ornn.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_ornn.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Magic Tank",
        range: 1,
        mana: "40/100",
        ability: "Disco Inferno"
    },
    "Rhaast": {
        cost: 3,
        name: "Rhaast",
        copies_in_pool: 18,
        synergies: ["Redeemer"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Rhaast.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_rhaast.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_rhaast.png",
        traitIcons: {"Redeemer": "https://cdn.metatft.com/file/metatft/traits/redeemer.png"},
        role: "Attack Tank",
        range: 1,
        mana: "30/90",
        ability: "Alien Scythe"
    },
    "Samira": {
        cost: 3,
        name: "Samira",
        copies_in_pool: 18,
        synergies: ["Space Groove", "Sniper"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Samira.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_samira.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_samira.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Sniper": "https://cdn.metatft.com/file/metatft/traits/sniper.png"},
        role: "Attack Caster",
        range: 4,
        mana: "0/60",
        ability: "Jump and Jive"
    },
    "Urgot": {
        cost: 3,
        name: "Urgot",
        copies_in_pool: 18,
        synergies: ["Mecha", "Brawler", "Marauder"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Urgot.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_urgot.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_urgot.png",
        traitIcons: {"Mecha": "https://cdn.metatft.com/file/metatft/traits/mecha.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png", "Marauder": "https://cdn.metatft.com/file/metatft/traits/marauder.png"},
        role: "Attack Fighter",
        range: 2,
        mana: "0/50",
        ability: "Unstoppable"
    },
    "Viktor": {
        cost: 3,
        name: "Viktor",
        copies_in_pool: 18,
        synergies: ["Psionic", "Channeler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Viktor.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_viktor.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_viktor.png",
        traitIcons: {"Psionic": "https://cdn.metatft.com/file/metatft/traits/psionic.png", "Channeler": "https://cdn.metatft.com/file/metatft/traits/channeler.png"},
        role: "Magic Caster",
        range: 4,
        mana: "20/80",
        ability: "Psionic Storm"
    },
    "Aurelion'Sol": {
        cost: 4,
        name: "Aurelion'Sol",
        copies_in_pool: 10,
        synergies: ["Mecha", "Channeler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_AurelionSol.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_aurelionsol.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_aurelionsol.png",
        traitIcons: {"Mecha": "https://cdn.metatft.com/file/metatft/traits/mecha.png", "Channeler": "https://cdn.metatft.com/file/metatft/traits/channeler.png"},
        role: "Magic Caster",
        range: 4,
        mana: "15/75",
        ability: "Deathbeam"
    },
    "Corki": {
        cost: 4,
        name: "Corki",
        copies_in_pool: 10,
        synergies: ["Meeple", "Fateweaver"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Corki.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_corki.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_corki.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Fateweaver": "https://cdn.metatft.com/file/metatft/traits/fateweaver.png"},
        role: "Attack Caster",
        range: 4,
        mana: "0/60",
        ability: "Asteroid Blaster"
    },
    "Karma": {
        cost: 4,
        name: "Karma",
        copies_in_pool: 10,
        synergies: ["Dark Star", "Voyager"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Karma.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_karma.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_karma.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Voyager": "https://cdn.metatft.com/file/metatft/traits/voyager.png"},
        role: "Magic Caster",
        range: 4,
        mana: "10/50",
        ability: "Singularity"
    },
    "Kindred": {
        cost: 4,
        name: "Kindred",
        copies_in_pool: 10,
        synergies: ["N.O.V.A.", "Challenger"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Kindred.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_kindred.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_kindred.png",
        traitIcons: {"N.O.V.A.": "https://cdn.metatft.com/file/metatft/traits/nova.png", "Challenger": "https://cdn.metatft.com/file/metatft/traits/challenger.png"},
        role: "Attack Marksman",
        range: 4,
        mana: "0/40",
        ability: "Cosmic Pursuit"
    },
    "LeBlanc": {
        cost: 4,
        name: "LeBlanc",
        copies_in_pool: 10,
        synergies: ["Arbiter", "Shepherd"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Leblanc.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_leblanc.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_leblanc.png",
        traitIcons: {"Arbiter": "https://cdn.metatft.com/file/metatft/traits/arbiter.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png"},
        role: "Magic Marksman",
        range: 4,
        mana: "0/40",
        ability: "Fracture Reality"
    },
    "Master Yi": {
        cost: 4,
        name: "Master Yi",
        copies_in_pool: 10,
        synergies: ["Psionic", "Marauder"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_MasterYi.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_masteryi.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_masteryi.png",
        traitIcons: {"Psionic": "https://cdn.metatft.com/file/metatft/traits/psionic.png", "Marauder": "https://cdn.metatft.com/file/metatft/traits/marauder.png"},
        role: "Attack Fighter",
        range: 1,
        mana: "30/70",
        ability: "Psi Strikes"
    },
    "Nami": {
        cost: 4,
        name: "Nami",
        copies_in_pool: 10,
        synergies: ["Space Groove", "Replicator"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Nami.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_nami.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_nami.png",
        traitIcons: {"Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Replicator": "https://cdn.metatft.com/file/metatft/traits/replicator.png"},
        role: "Magic Caster",
        range: 4,
        mana: "30/85",
        ability: "Bubble Pop"
    },
    "Nunu": {
        cost: 4,
        name: "Nunu",
        copies_in_pool: 10,
        synergies: ["Stargazer", "Vanguard"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Nunu.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_nunu.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_nunu.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png"},
        role: "Magic Tank",
        range: 1,
        mana: "45/155",
        ability: "Calamity"
    },
    "Rammus": {
        cost: 4,
        name: "Rammus",
        copies_in_pool: 10,
        synergies: ["Meeple", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Rammus.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_rammus.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_rammus.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Magic Tank",
        range: 1,
        mana: "30/100",
        ability: "Gravitational Spin"
    },
    "Riven": {
        cost: 4,
        name: "Riven",
        copies_in_pool: 10,
        synergies: ["Timebreaker", "Rogue"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Riven.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_riven.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_riven.png",
        traitIcons: {"Timebreaker": "https://cdn.metatft.com/file/metatft/traits/timebreaker.png", "Rogue": "https://cdn.metatft.com/file/metatft/traits/rogue.png"},
        role: "Hybrid Fighter",
        range: 1,
        mana: "0/20",
        ability: "Time Warp"
    },
    "Tahm Kench": {
        cost: 4,
        name: "Tahm Kench",
        copies_in_pool: 10,
        synergies: ["Oracle", "Brawler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_TahmKench.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_tahmkench.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_tahmkench.png",
        traitIcons: {"Oracle": "https://cdn.metatft.com/file/metatft/traits/arcana.png", "Brawler": "https://cdn.metatft.com/file/metatft/traits/brawler.png"},
        role: "Magic Tank",
        range: 1,
        mana: "50/120",
        ability: "Tongue Lash"
    },
    "The Mighty Mech": {
        cost: 4,
        name: "The Mighty Mech",
        copies_in_pool: 10,
        synergies: ["Mecha", "Voyager"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_TheMightyMech.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_themightymech.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_themightymech.png",
        traitIcons: {"Mecha": "https://cdn.metatft.com/file/metatft/traits/mecha.png", "Voyager": "https://cdn.metatft.com/file/metatft/traits/voyager.png"},
        role: "Attack Tank",
        range: 1,
        mana: "40/100",
        ability: "Gravity Matrix"
    },
    "Xayah": {
        cost: 4,
        name: "Xayah",
        copies_in_pool: 10,
        synergies: ["Stargazer", "Sniper"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Xayah.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_xayah.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_xayah.png",
        traitIcons: {"Stargazer": "https://cdn.metatft.com/file/metatft/traits/stargazer.png", "Sniper": "https://cdn.metatft.com/file/metatft/traits/sniper.png"},
        role: "Attack Marksman",
        range: 4,
        mana: "0/50",
        ability: "Stellar Ricochet"
    },
    "Bard": {
        cost: 5,
        name: "Bard",
        copies_in_pool: 9,
        synergies: ["Meeple", "Channeler"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Bard.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_bard.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_bard.png",
        traitIcons: {"Meeple": "https://cdn.metatft.com/file/metatft/traits/meeple.png", "Channeler": "https://cdn.metatft.com/file/metatft/traits/channeler.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/70",
        ability: "Ultra Friendly Object"
    },
    "Blitzcrank": {
        cost: 5,
        name: "Blitzcrank",
        copies_in_pool: 9,
        synergies: ["Party Animal", "Space Groove", "Vanguard"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Blitzcrank.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_blitzcrank.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_blitzcrank.png",
        traitIcons: {"Party Animal": "https://cdn.metatft.com/file/metatft/traits/partyanimal.png", "Space Groove": "https://cdn.metatft.com/file/metatft/traits/spacegroove.png", "Vanguard": "https://cdn.metatft.com/file/metatft/traits/vanguard.png"},
        role: "Magic Fighter",
        range: 1,
        mana: "10/90",
        ability: "Party Crasher"
    },
    "Fiora": {
        cost: 5,
        name: "Fiora",
        copies_in_pool: 9,
        synergies: ["Divine Duelist", "Anima", "Marauder"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Fiora.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_fiora.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_fiora.png",
        traitIcons: {"Divine Duelist": "https://cdn.metatft.com/file/metatft/traits/divineduelist.png", "Anima": "https://cdn.metatft.com/file/metatft/traits/anima.png", "Marauder": "https://cdn.metatft.com/file/metatft/traits/marauder.png"},
        role: "Attack Fighter",
        range: 1,
        mana: "10/80",
        ability: "Perfect Bladework"
    },
    "Graves": {
        cost: 5,
        name: "Graves",
        copies_in_pool: 9,
        synergies: ["Factory New"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Graves.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_graves.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_graves.png",
        traitIcons: {"Factory New": "https://cdn.metatft.com/file/metatft/traits/factorynew.png"},
        role: "Attack Marksman",
        range: 4,
        mana: "0/60",
        ability: "Collateral Damage"
    },
    "Jhin": {
        cost: 5,
        name: "Jhin",
        copies_in_pool: 9,
        synergies: ["Dark Star", "Eradicator", "Sniper"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Jhin.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_jhin.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_jhin.png",
        traitIcons: {"Dark Star": "https://cdn.metatft.com/file/metatft/traits/darkstar.png", "Eradicator": "https://cdn.metatft.com/file/metatft/traits/supermassive.png", "Sniper": "https://cdn.metatft.com/file/metatft/traits/sniper.png"},
        role: "Attack Marksman",
        range: 4,
        mana: "0/44",
        ability: "Space Opera"
    },
    "Morgana": {
        cost: 5,
        name: "Morgana",
        copies_in_pool: 9,
        synergies: ["Dark Lady"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Morgana.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_morgana.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_morgana.png",
        traitIcons: {"Dark Lady": "https://cdn.metatft.com/file/metatft/traits/darklady.png"},
        role: "Magic Fighter",
        range: 2,
        mana: "20/60",
        ability: "Dark Form"
    },
    "Shen": {
        cost: 5,
        name: "Shen",
        copies_in_pool: 9,
        synergies: ["Bulwark", "Bastion"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Shen.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_shen.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_shen.png",
        traitIcons: {"Bulwark": "https://cdn.metatft.com/file/metatft/traits/bulwark.png", "Bastion": "https://cdn.metatft.com/file/metatft/traits/bastion.png"},
        role: "Magic Fighter",
        range: 1,
        mana: "10/70",
        ability: "Reality Tear"
    },
    "Sona": {
        cost: 5,
        name: "Sona",
        copies_in_pool: 9,
        synergies: ["Commander", "Psionic", "Shepherd"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Sona.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_sona.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_sona.png",
        traitIcons: {"Commander": "https://cdn.metatft.com/file/metatft/traits/commander.png", "Psionic": "https://cdn.metatft.com/file/metatft/traits/psionic.png", "Shepherd": "https://cdn.metatft.com/file/metatft/traits/shepherd.png"},
        role: "Magic Caster",
        range: 4,
        mana: "0/25",
        ability: "Psionic Crush"
    },
    "Vex": {
        cost: 5,
        name: "Vex",
        copies_in_pool: 9,
        synergies: ["Doomer"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Vex.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_vex.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_vex.png",
        traitIcons: {"Doomer": "https://cdn.metatft.com/file/metatft/traits/doomer.png"},
        role: "Magic Marksman",
        range: 4,
        mana: "0/60",
        ability: "Lend Me a Hand"
    },
    "Zed": {
        cost: 5,
        name: "Zed",
        copies_in_pool: 9,
        synergies: ["Galaxy Hunter"],
        tile: "https://ap.tft.tools/img/new17/face_full/TFT17_Zed.jpg",
        icon: "https://cdn.metatft.com/file/metatft/champions/tft17_zed.png",
        splash: "https://cdn.metatft.com/file/metatft/championsplashes/tft17_zed.png",
        traitIcons: {"Galaxy Hunter": "https://cdn.metatft.com/file/metatft/traits/galaxyhunter.png"},
        role: "Attack Fighter",
        range: 1,
        mana: "30/80",
        ability: "Quantum Clone"
    },
};

export const set17_traits = {
    "Anima": {
        icon: "https://cdn.metatft.com/file/metatft/traits/anima.png",
        breakpoints: [3, 6]
    },
    "Arbiter": {
        icon: "https://cdn.metatft.com/file/metatft/traits/arbiter.png",
        breakpoints: [2, 3]
    },
    "Bastion": {
        icon: "https://cdn.metatft.com/file/metatft/traits/bastion.png",
        breakpoints: [2, 4, 6]
    },
    "Brawler": {
        icon: "https://cdn.metatft.com/file/metatft/traits/brawler.png",
        breakpoints: [2, 4, 6]
    },
    "Bulwark": {
        icon: "https://cdn.metatft.com/file/metatft/traits/bulwark.png",
        breakpoints: []
    },
    "Challenger": {
        icon: "https://cdn.metatft.com/file/metatft/traits/challenger.png",
        breakpoints: [2, 3, 4, 5]
    },
    "Channeler": {
        icon: "https://cdn.metatft.com/file/metatft/traits/channeler.png",
        breakpoints: [2, 3, 4, 5]
    },
    "Commander": {
        icon: "https://cdn.metatft.com/file/metatft/traits/commander.png",
        breakpoints: []
    },
    "Dark Lady": {
        icon: "https://cdn.metatft.com/file/metatft/traits/darklady.png",
        breakpoints: []
    },
    "Dark Star": {
        icon: "https://cdn.metatft.com/file/metatft/traits/darkstar.png",
        breakpoints: [2, 4, 6, 9]
    },
    "Divine Duelist": {
        icon: "https://cdn.metatft.com/file/metatft/traits/divineduelist.png",
        breakpoints: []
    },
    "Doomer": {
        icon: "https://cdn.metatft.com/file/metatft/traits/doomer.png",
        breakpoints: []
    },
    "Eradicator": {
        icon: "https://cdn.metatft.com/file/metatft/traits/supermassive.png",
        breakpoints: []
    },
    "Factory New": {
        icon: "https://cdn.metatft.com/file/metatft/traits/factorynew.png",
        breakpoints: []
    },
    "Fateweaver": {
        icon: "https://cdn.metatft.com/file/metatft/traits/fateweaver.png",
        breakpoints: [2, 4]
    },
    "Galaxy Hunter": {
        icon: "https://cdn.metatft.com/file/metatft/traits/galaxyhunter.png",
        breakpoints: []
    },
    "Gun Goddess": {
        icon: "https://cdn.metatft.com/file/metatft/traits/gungoddess.png",
        breakpoints: []
    },
    "Marauder": {
        icon: "https://cdn.metatft.com/file/metatft/traits/marauder.png",
        breakpoints: [2, 4, 6]
    },
    "Mecha": {
        icon: "https://cdn.metatft.com/file/metatft/traits/mecha.png",
        breakpoints: [3, 4, 6]
    },
    "Meeple": {
        icon: "https://cdn.metatft.com/file/metatft/traits/meeple.png",
        breakpoints: [3, 5, 7, 10]
    },
    "N.O.V.A.": {
        icon: "https://cdn.metatft.com/file/metatft/traits/nova.png",
        breakpoints: [2, 5]
    },
    "Oracle": {
        icon: "https://cdn.metatft.com/file/metatft/traits/arcana.png",
        breakpoints: []
    },
    "Party Animal": {
        icon: "https://cdn.metatft.com/file/metatft/traits/partyanimal.png",
        breakpoints: []
    },
    "Primordian": {
        icon: "https://cdn.metatft.com/file/metatft/traits/primordian.png",
        breakpoints: [2, 3]
    },
    "Psionic": {
        icon: "https://cdn.metatft.com/file/metatft/traits/psionic.png",
        breakpoints: [2, 4]
    },
    "Redeemer": {
        icon: "https://cdn.metatft.com/file/metatft/traits/redeemer.png",
        breakpoints: [1]
    },
    "Replicator": {
        icon: "https://cdn.metatft.com/file/metatft/traits/replicator.png",
        breakpoints: [2, 4]
    },
    "Rogue": {
        icon: "https://cdn.metatft.com/file/metatft/traits/rogue.png",
        breakpoints: [2, 3, 4, 5]
    },
    "Shepherd": {
        icon: "https://cdn.metatft.com/file/metatft/traits/shepherd.png",
        breakpoints: [3, 5, 7]
    },
    "Sniper": {
        icon: "https://cdn.metatft.com/file/metatft/traits/sniper.png",
        breakpoints: [2, 3, 4, 5]
    },
    "Space Groove": {
        icon: "https://cdn.metatft.com/file/metatft/traits/spacegroove.png",
        breakpoints: [1, 3, 5, 7, 10]
    },
    "Stargazer": {
        icon: "https://cdn.metatft.com/file/metatft/traits/stargazer.png",
        breakpoints: [3, 4, 5, 6]
    },
    "Timebreaker": {
        icon: "https://cdn.metatft.com/file/metatft/traits/timebreaker.png",
        breakpoints: [2, 3, 4]
    },
    "Vanguard": {
        icon: "https://cdn.metatft.com/file/metatft/traits/vanguard.png",
        breakpoints: [2, 4, 6]
    },
    "Voyager": {
        icon: "https://cdn.metatft.com/file/metatft/traits/voyager.png",
        breakpoints: [2, 3, 4, 5, 6]
    },
};