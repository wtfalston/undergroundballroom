export interface Track {
  id: number;
  title: string;
  lyrics: string;
  duration?: string;
  notes?: string;
}

export interface Tale {
  id: number;
  title?: string;
  text: string;
}

export interface SiteContent {
  title: string;
  introQuote: string;
  introCredits: string;
  leftSectionTitle: string;
  leftSectionKey: string;
  rightSectionTitle: string;
  rightSectionKey: string;
  portraitImage: string;
  portraitAlt: string;
  secretImage: string;
  secretGallery: string[];
  secretMessage: string;
  copyright: string;
  creationDate: string;
  lastUpdated: string;
  audioSrc: string;
  isPasswordProtected: boolean;
  password: string;
  tracks: Track[];
  tales: Tale[];
}

export const STORAGE_KEY = 'underground_ballroom_content_v1';

export const DEFAULT_TRACKS: Track[] = [
  {
    id: 1,
    title: 'Terrified .',
    lyrics: '(No Lyrics — Instrumental)',
    duration: '2:14',
    notes: 'Opening instrumental composition'
  },
  {
    id: 2,
    title: 'All Eyes On Me',
    lyrics: `I been killing, fucking it up (aah)
They say that I’m the problem but that isn’t enough (ahh ah)
I been killing shit I do what I must
They say that I’m the problem but that isn’t enough (ahh ah)

All eyes on me
All eyes on me
All eyes on me
All their eyes are gon’ see
The nights I don’t sleep
The lies I don’t keep
All their eyes gon see what
Lies upon me

This an underground ballroom
Full of harlots and
Dog ass witches eating dog food
And demons tryna pinch a flame from the candle`,
    duration: '3:22'
  },
  {
    id: 3,
    title: 'Playlist .',
    lyrics: `Spinning on the phonograph in the crypt below
Static through the copper horn where the shadows go
Every song you ever cried to, every verse you burned
Waiting on the second side for the needle to turn.`,
    duration: '2:45'
  },
  {
    id: 4,
    title: 'Creep',
    lyrics: `Crawling up the velvet stair
Dust inside your golden hair
Whisper what you came to find
Leave the daylight far behind.`,
    duration: '3:10'
  },
  {
    id: 5,
    title: 'Like A Virgin',
    lyrics: `Touched for the very first time by the cold marble stone
Down in the ballroom where nobody sleeps alone
Chandelier shaking when the organ begins
Forgive us the beauty of all of our sins.`,
    duration: '3:05'
  },
  {
    id: 6,
    title: 'Jungle-Affair .',
    lyrics: `Vines across the parquet floor
Tigers at the cedar door
Heavy humidity, gin on the tongue
We were so ancient when we were young.`,
    duration: '2:50'
  },
  {
    id: 7,
    title: '51 Ttashpel Pony Ave .',
    lyrics: `Address written on a damp matchbox
Past the iron gate and the broken clocks
Walk three paces, knock on the slate
Nobody asks why you arrived so late.`,
    duration: '3:18'
  },
  {
    id: 8,
    title: 'Hard Candy',
    lyrics: `Sweet on the surface, razor underneath
Bite down gently through porcelain teeth
Sugar and cyanide, crimson and lace
Another lost visitor in this dark place.`,
    duration: '2:38'
  },
  {
    id: 9,
    title: 'Rewind',
    lyrics: `Tape reels spooling backward through the dust
Every silver promise turning into rust
Play it back to the beginning before the curtain fell
Before we made a palace of this quiet subterranean cell.`,
    duration: '3:30'
  },
  {
    id: 10,
    title: 'Essex Girls .',
    lyrics: `Eyeliner smudged under cold neon glare
Stiletto heels echoing on the cellar stair
Laughing at the prophecies, dancing in the smoke
Nothing is a tragedy until the mirror broke.`,
    duration: '2:55'
  },
  {
    id: 11,
    title: 'Night , Blooming Jasmine .',
    lyrics: `Perfume heavy as wet earth after rain
A fragrant narcotic that soothes away the pain
Petals opening in pitch black midnight hour
Death is just the closing of an intoxicating flower.`,
    duration: '4:12'
  },
  {
    id: 12,
    title: 'Wrong Relief',
    lyrics: `Took the medicine that tasted like iron and salt
Blamed the architect, said it was the builder’s fault
Now the ceiling is descending, inch by measured inch
Even the brave men learn how to flinch.`,
    duration: '3:02'
  },
  {
    id: 13,
    title: 'Fire & Ice .',
    lyrics: `Some say the ballroom ends in a sudden blaze
Some say in frost through subterranean maze
I’ve tasted both upon this checkered floor
Either will suffice to seal the iron door.`,
    duration: '2:44'
  },
  {
    id: 14,
    title: 'Kiss Of Death',
    lyrics: `Cold lips against the pulse of the throat
Written down in an unaddressed note
Do not weep for what was destined to fade
Everything is softer in the velvet shade.`,
    duration: '3:15'
  },
  {
    id: 15,
    title: 'Creed .',
    lyrics: `We believe in the resonance of hollow halls
We believe in the moisture on limestone walls
We believe in the rhythm that never sees the sun
Amen until the long night is done.`,
    duration: '2:20'
  },
  {
    id: 16,
    title: 'Tell Me What You’re Missing .',
    lyrics: `Is it the sunlight? The morning bread?
Or the warm voices of the living and dead?
Tell me right now before the waltz slows down
There are no clocks in this underground town.`,
    duration: '3:40'
  },
  {
    id: 17,
    title: 'Forget me Not',
    lyrics: `Small blue flower pressed inside the hymnal book
Cast one final lingering backwards look
The staircase is gone, the door is a wall
The music is the only thing standing tall.`,
    duration: '3:08'
  },
  {
    id: 18,
    title: 'Rétard Angel .',
    lyrics: `Wings of tinfoil and broken violin strings
Falling through the skylight where nobody sings
Blessing the dancers who forgot their own name
Lifting a chalice of cold golden flame.`,
    duration: '3:35'
  },
  {
    id: 19,
    title: 'Etna .',
    lyrics: `Molten stone rumbling underneath the tiles
Sulfur in the air for twenty miles
Let the volcano erupt, let the chandeliers swing
Down in the ballroom we will still sing.`,
    duration: '4:05'
  }
];

export const DEFAULT_TALES: Tale[] = [
  {
    id: 1,
    text: `it won’t lift until I leave. I am sorry my dear but i must leave you in this jungle. I am 20, I have seen the best minds of my generation destroyed by madness and vanity, starving hysterical naked, dragging themselves through the negro streets at beautiful dawn looking for an angry fix, Angel headed models burning for the ancient heavenly connection to the starry dynamo in the machinery of night. hollow eyed and high sat up smoking in the supernatural darkness of room 15, lit gently by fairies and Tom and Jerry’s illustrated glow, The smoke climbs and crawls through the translucent curtains, I see my smoke floating across the tops of this city , I do this in every city I am in and I am always contemplating but this time it is different, I notice the Eternal Return to the same nothingness to an empty hotel room again just like in the last city. The same Characters , the same drama , the same events , like clock work , like seasons. I have seen all the city angels, ones just like you, staggering on tenement roofs, so illuminated, who passed through the same way every time, just like you, with radiant eyes hallucinating those London nights all over again to me. But you don’t know that’s what I see in you. When there was no tragedy, when the windows of my skull were virgin. It was safe to cower in that unshaven room, my fragrance pet maple stunk good, I sat in underwear, burning money in my wastebaskets and listening to the Terror and Nemo bubbles in peace.

I am just too faithful to my soil. I just had to leave it to figure that out. goodbye and goodnight. We’ve been in this room too long.`
  },
  {
    id: 2,
    text: `This had to be this way, Do not be afraid, our fate

Cannot be taken from us, it is a gift.

But just know that the stars that marked our starting fall away, We must go deeper into greater pain,

for it is not permitted that we stay in that little place we come from.

You tell this story right and through you they will go into a city of weeping, through you they will hear what it is said amongst the lost. And

I know they want to get you , they hope not ever to see Heaven. They have come to lead you to the other shore, into fire and into ice.`
  },
  {
    id: 3,
    text: `The ballroom has no compass points. North is wherever the orchestra pit sank sixty years ago; South is the archway leading to the bricked-over coal chute. We dance clockwise because counter-clockwise makes the wax drips fly off the candelabras into the dancers' hair. No one has asked for daylight since the second Thursday of November.`
  },
  {
    id: 4,
    text: `Under the third floorboard by the grand mirror, there is a silver teaspoon with the monogram 'V.C.'. If you press your ear against the parquet right above it during the silence between songs, you can hear water running through London’s hidden rivers—the Fleet, the Tyburn, the Walbrook—flowing straight beneath our heels toward the dark Thames.`
  },
  {
    id: 5,
    text: `A girl arrived wearing a dress made entirely of theatre ticket stubs from 1994. Every stub was punched in the center. When asked what she was drinking, she asked for tap water in an amber bottle. She danced three waltzes with a stranger whose coat smelled of rain and tobacco, then vanished into the powder room and never came out.`
  },
  {
    id: 6,
    text: `The chandeliers do not use electricity. Every evening at dusk, an attendant with a long brass taper moves from fixture to fixture. If a wick sputters twice, it means someone upstairs on the street is walking above your head without knowing you exist.`
  },
  {
    id: 7,
    text: `51 Ttashpel Pony Ave was never on the municipal survey. The postman skipped the number between 49 and 53 for thirty-two years. When the demolition crews arrived in 2011, their jackhammers struck solid slate ten feet down and the engines seized simultaneously.`
  },
  {
    id: 8,
    text: `Memorize the face of the cellist. He has played the same diminished fifth on every record cut in Soho since the winter of the great freeze. His bow is strung with white horsehair that never discolors.`
  },
  {
    id: 9,
    text: `The rule of the Ballroom is quiet: take nothing except the chorus of the song that saved your life. Leave nothing except the spent matches and the dust on your soles.`
  },
  {
    id: 10,
    text: `We found Tina's notebook wedged behind the bass amplifier. The first page had seven telephone numbers, all crossed out with red wax pencil. The second page read: 'If the melody repeats four times without resolution, turn the master fader down and step away from the microphone immediately.'`
  },
  {
    id: 11,
    text: `The scent of jasmine always precedes the cold spot by the coat check. It is not perfume; it is memory preserved under high pressure.`
  },
  {
    id: 12,
    text: `Some doors are painted onto the brick so well that guests attempt to turn the brass knob. Once every few years, the knob turns.`
  },
  {
    id: 13,
    text: `Fire and ice are not opposites down here. They are two different temperatures of the same silence.`
  },
  {
    id: 14,
    text: `A letter arrived from Berlin addressed to 'The Resident of Seat 14'. It contained a single black feather and a bus timetable for route 38 dated October 1988.`
  },
  {
    id: 15,
    text: `We keep a gramophone in the corner that requires no winding. It only plays when the bar is empty and the cleaners have locked the iron gate.`
  },
  {
    id: 16,
    text: `Tell me what you are missing, and I will show you which alcove holds its echo.`
  },
  {
    id: 17,
    text: `In spring, the damp walls weep in the shape of small blue petals. We wipe them with linen napkins before the evening guests arrive.`
  },
  {
    id: 18,
    text: `The angel on the ceiling mural has one eye chipped away by damp. If you stare at it while the bass drum plays, the missing eye seems to follow the waltz.`
  },
  {
    id: 19,
    text: `Mount Etna erupted on the night track nineteen was recorded. The seismic needle in Catania jumped at the exact second the final synthesizer chord died away.`
  },
  {
    id: 20,
    text: `The mirrors do not reverse your image. They show you standing three seconds in the future.`
  },
  {
    id: 21,
    text: `Never count the number of pillars along the south wall while walking. The count is always either eleven or thirteen, never twelve.`
  },
  {
    id: 23,
    text: `There is no tale twenty-two. It was struck from the record by unanimous agreement of the committee in 1999.`
  },
  {
    id: 24,
    text: `The bar serves only two beverages: black tea steeped with cardamom, and red wine poured from unlabeled glass carafes.`
  },
  {
    id: 25,
    text: `When the underground trains pass overhead, the wine in your glass forms concentric rings. Count seven rings and make a wish; it will not come true, but the taste becomes sweeter.`
  },
  {
    id: 26,
    text: `A guest once stayed for forty-eight hours without speaking. When he stood up to depart, he left a gold sovereign on the table and whispered: 'Thank you for keeping the night intact.'`
  },
  {
    id: 27,
    title: 'My, My',
    text: `My, my. Look at how long we’ve danced in the dark. The streetlights above are turning off one by one, and the morning milk trucks are rattling over the cobblestones. But down here in the Underground Ballroom, the waltz has only just begun. Leave your coat on the peg. You won’t be needing it where we’re going.`
  }
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  title: 'Underground Ballroom',
  introQuote: '“Terrified .”',
  introCredits: 'The debut album by fakemink. Written and produced by Vincenzo Camille, Tina Temps & Roshina Coleman.',
  leftSectionTitle: 'Lyrics',
  leftSectionKey: 'L',
  rightSectionTitle: 'Tales',
  rightSectionKey: 'T',
  portraitImage: '/src/assets/images/ballroom_portrait_1794497955657.jpg',
  portraitAlt: 'Terrified',
  secretImage: '/src/assets/images/secret_ballroom_1794497956101.jpg',
  secretGallery: [
    '/src/assets/images/ballroom_portrait_1794497955657.jpg',
    '/src/assets/images/secret_ballroom_1794497956101.jpg',
    '/src/assets/images/ballroom_relic_1794497956485.jpg'
  ],
  secretMessage: 'Welcome to the inner chamber. The archive is open.',
  copyright: '© Terrified 2026',
  creationDate: 'May 20, 2026',
  lastUpdated: '05/21/26',
  audioSrc: '/under-96.mp3',
  isPasswordProtected: false,
  password: 'Coppola1979',
  tracks: DEFAULT_TRACKS,
  tales: DEFAULT_TALES
};

export function loadSiteContent(): SiteContent {
  if (typeof window === 'undefined') {
    return DEFAULT_SITE_CONTENT;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      tracks: Array.isArray(parsed.tracks) && parsed.tracks.length > 0 ? parsed.tracks : DEFAULT_SITE_CONTENT.tracks,
      tales: Array.isArray(parsed.tales) && parsed.tales.length > 0 ? parsed.tales : DEFAULT_SITE_CONTENT.tales,
      secretGallery: Array.isArray(parsed.secretGallery) && parsed.secretGallery.length > 0 ? parsed.secretGallery : DEFAULT_SITE_CONTENT.secretGallery
    };
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (err) {
    console.error('Failed to save content to localStorage:', err);
  }
}

export function resetSiteContent(): SiteContent {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_SITE_CONTENT;
}

export function verifyPassword(input: string, targetPassword: string): boolean {
  return input.trim() === targetPassword.trim();
}

export function exportContentAsJSON(content: SiteContent): string {
  return JSON.stringify(content, null, 2);
}

export function importContentFromJSON(jsonString: string): SiteContent {
  const parsed = JSON.parse(jsonString);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('Invalid JSON format for site content');
  }
  if (!parsed.title || typeof parsed.title !== 'string') {
    throw new Error('Missing title property in imported content');
  }
  return {
    ...DEFAULT_SITE_CONTENT,
    ...parsed,
    tracks: Array.isArray(parsed.tracks) ? parsed.tracks : DEFAULT_SITE_CONTENT.tracks,
    tales: Array.isArray(parsed.tales) ? parsed.tales : DEFAULT_SITE_CONTENT.tales,
    secretGallery: Array.isArray(parsed.secretGallery) ? parsed.secretGallery : DEFAULT_SITE_CONTENT.secretGallery
  };
}
