const faker = require("faker");
const { CATEGORY_COLOR_MAP } = require("constants/index");

export function queryObj2Str(query) {
  if (typeof query !== "object") {
    return "";
  }

  return Object.entries(query).reduce(
    (str, [key, value], idx) =>
      str +
      (idx === 0 ? "" : "&") +
      (typeof value == "undefined" ? key : `${key}=${value}`),
    "",
  );
}

export function queryStr2Obj(query) {
  if (typeof query !== "string") {
    return false;
  }

  const paramPairStrings = query.split("&");
  const paramPairEntries = paramPairStrings.map(kvp => kvp.split("="));

  return Object.fromEntries(paramPairEntries);
}

const DEFAULT_POST_COUNT = 5;
export function generateFakeData({ module_opts, query }) {
  if (module_opts.type === "newsletter") {
    return { type: "newsletter" };
  } else if (module_opts.type === "instagram") {
    return generateFakeInstagramPosts();
  }
  const { posts_per_page = DEFAULT_POST_COUNT } = query;

  const posts = [...Array(posts_per_page)].map(generateFakePost);

  return {
    posts,
    ...module_opts,
  };
}

function generateFakePost() {
  const title =
    faker.name.findName() +
    " " +
    faker.name.jobTitle() +
    " " +
    faker.company.bsBuzz() +
    " " +
    faker.company.catchPhrase();

  return {
    id: faker.random.number(),
    title,
    imageSrc: faker.image.image(),
    link: "http://allthatsinteresting.com",
    categoryName: faker.company.catchPhraseAdjective(),
    categoryColor: faker.random.objectElement(CATEGORY_COLOR_MAP),
  };
}

const generateFakeInstagramPosts = () => ({
  posts: [
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F7739a6d40bcd5448edb729a4198b354e%2F5D03A8C7%2Ft51.2885-15%2Fe15%2Fc0.53.612.612%2F52834696_2196312767287769_8983310581318517868_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "James Brown steps off a jet in 1967. For more of history's coolest vintage photos, click the link in our bio.\u2063\n\u2063\n\u2063\n\u2063\n#jamesbrown #godfatherofsoul #1967 #1960s #instacool #cool",
      link: "https://www.instagram.com/p/Bu_jMdhgrYG",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F98f996c87ade5d012294acb188865a29%2F5D257C0D%2Ft51.2885-15%2Fe15%2Fc120.0.480.480%2F53275073_797095414004076_3118833460271563780_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "John Titor claimed to be from the future: a time traveler sent back to 2000 to ensure that the U.S. stayed intact and the world didn't descend into chaos. This is the computer he claimed would save the planet. Check out his full story at the link in our bio. \u2063\n\u2063\n\u2063\n\u2063\n\u2063\n#johntitor #timetravel #year2000 #endoftheworld #weirdhistory",
      link: "https://www.instagram.com/p/Bu-MucplJy6",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F37a8b658b9b107f45c918cad10651b41%2F5D1CD5CC%2Ft51.2885-15%2Fe15%2Fc0.72.612.612a%2F52940785_337184343583063_2681612640141803830_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Steven Spielberg, Tom Hanks, Matt Damon, and Ed Burns on the set of \u201cSaving Private Ryan.\u201d The war epic made over $481 million worldwide, making it the second-highest-grossing film of 1998.\n\nFor more behind the scenes images from Hollywood classics, click the link in our profile.\n\n#savingprivateryan #tomhanks #stevenspielberg #hollywood #films #behindthescenes",
      link: "https://www.instagram.com/p/Bu8-ZinjEvt",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F8fbb7cdd4d736ded03c6e9037a977d0b%2F5D2498DF%2Ft51.2885-15%2Fe15%2Fc88.0.463.463%2F53926648_256359688637228_8381792213053668724_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        'Colombian tattoo artist \u201cKalaca Skull\u201d became the first person to ever have his nose and ears voluntarily removed as part of his dream to become a "human skull." Read his full story at the link in our bio. \u2063\n\u2063\n\u2063\n\u2063\n\u2063\n#humanskull #kalacaskull #tattooartist #bodymodification',
      link: "https://www.instagram.com/p/Bu7QiNRDCIw",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Fb38431d5df4d2210e5272c7f98153b07%2F5D164BD5%2Ft51.2885-15%2Fe15%2Fc130.0.460.460%2F52183964_2389214847968566_891567339294173267_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Due to a rare natural phenomenon, a beach in Siberia was once covered in snowballs that naturally formed due to the motion of the tide, wind, and other factors. Check out other crazy things that have washed up on beaches around the world at the link in our bio. \u2063\n\u2063\n\u2063\n\u2063\n#snowballs #beaches #weirdphenomenon #siberia #oceans",
      link: "https://www.instagram.com/p/Bu61FBKh6us",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Fb78f4441e263b769bea8d37b61e006fd%2F5D0563C6%2Ft51.2885-15%2Fe15%2Fc130.0.460.460%2F54512361_254613858815339_6061640207999721049_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "American Congressman Charlie Wilson poses with mujahideen fighters in Afghanistan. The U.S. spent billions financing and training these fighters \u2014 then some of them turned around and formed Al-Qaeda.\n\nSee more photos of the Soviet-Afghan war by clicking the link in our profile.\n\n#afghanistan #charliewilson #war #modernwar #cia #alqaeda #terrorism",
      link: "https://www.instagram.com/p/Bu6ZnSughAo",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Fedc71f9320c82a3fa878705421957f8a%2F5D07628C%2Ft51.2885-15%2Fe15%2Fc169.0.381.381%2F52821530_436947060381169_659424387874428088_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Check out the Scold's Bridle, the Middle Ages' answer for talkative women. Women who gossiped too much faced public humiliation at the hands of their husbands when they were forced to wear the Scold's Bridle for hours on end.\u2063\n\u2063\n\u2063\n\u2063\n\u2063\n#scoldsbridle #middleages #talkativewomen #talkingtoomuch #womenshistory",
      link: "https://www.instagram.com/p/Bu4rvWuARQO",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F970a9b49727ddb2cfa83c9487de0baa1%2F5D144889%2Ft51.2885-15%2Fe15%2Fc109.0.502.502%2F53506511_2260183477579506_6940623085229335857_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        'The Ramesseum temple at Thebes, Egypt, circa 1858-1859.\n\nFrancis Frith\'s photographs of the Middle East received such wide acclaim that he returned to Palestine, Syria, and Egypt twice before 1860, traveling farther up the Nile than any photographer before him. \nWhether it was the Holy Land or elsewhere, Frith believed that photographs could capture the essence of a space unlike any other medium. Photographs, Frith said, could achieve "far beyond anything that is in the power of the most accomplished artist to transfer to his canvas." See more of his photos by clicking the link in our bio.\n\n#egypt #ancientegypt #1800s #19thcentury',
      link: "https://www.instagram.com/p/Bu4QSa6AFGR",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Fea9825a96e8c7209066932b3f423c833%2F5D0D257B%2Ft51.2885-15%2Fe15%2Fc129.0.462.462%2F53476586_526183477787528_3521160327548721436_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "On New Year's Day, a rare snowstorm blanketed the American southwest in a layer of snow. See photos of the Grand Canyon, the Sonoran Desert, and more covered in snow by following the link in our profile.\n\n#sedona #snow #winter #arizona #az #beautiful",
      link: "https://www.instagram.com/p/Bu31YbLjBiP",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Fbb7a6a0cc1b85b4e2c68c93c66874a3e%2F5D157D62%2Ft51.2885-15%2Fe15%2Fc0.33.612.612a%2F54511622_2292827997626957_404802503166731171_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Though it can be hard to imagine, before they were stars, celebrities were just like us. They had bad hair days, fashion faux pas, and awkward phases \u2013 and just like us, they were caught on camera. Like this photo of a young Marilyn Monroe, for instance. For more headshots of famous icons, check out the link in our bio. \u2063\n\u2063\n\u2063\n\u2063\n#marilynmonroe #headshots #beforetheywerefamous #starsarejustlikeus #awkwardphotos #awkwardheadshots #oldheadshotday",
      link: "https://www.instagram.com/p/Bu2G80tl0tz",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2Faef3e0ff1454cbf76d7c9d45b777f52e%2F5D1A5558%2Ft51.2885-15%2Fe15%2Fc77.0.458.458%2F54513190_698920220510340_3033955282448826403_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Meet La Pascualita, a remarkably lifelike wedding dress mannequin from Chihuahua, Mexico. Local legend holds that La Pascualita is the preserved corpse of a shop owner's daughter who died tragically on her wedding day, though the shop says otherwise. Read her full story at the link in our bio and decide for yourself. \u2063\n\u2063\n\u2063\n\u2063\n#lapascualita #chihuahua #mexico #mannequin #lifelikemannequin #creepy",
      link: "https://www.instagram.com/p/Bu1re7vg25W",
    },
    {
      imageSrc:
        "https://allthatsinteresting.com/thumb/https%3A%2F%2Fscontent-lga3-1.cdninstagram.com%2Fvp%2F0700da4b01630f673c91fabd0f9b1ff3%2F5D17DD9B%2Ft51.2885-15%2Fe15%2Fc237.0.606.606a%2F54247944_122178932252090_3226900722804952074_n.jpg%3F_nc_ht%3Dscontent-lga3-1.cdninstagram.com",
      title:
        "Jay-Z visits London in 1988 at the age of 19. For more images of celebrities before they made it big, visit the link in our bio.\u2063\n\u2063\n\u2063\n\u2063\n#jayz #london #80s #1980s #1988 #travel #vintage",
      link: "https://www.instagram.com/p/Bu1QA2OAcbM",
    },
  ],
  type: "instagram",
});
