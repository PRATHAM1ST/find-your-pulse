export const UserCards: UserInfo[] = [
  {
    name: "John Doe",
    walletAddress: "0x1234567890abcdef",
    telegramId: "@johndoe",
    bio: "I am a software engineer",
    picturesUrl: [
      "https://random.imagecdn.app/500/500",
      "https://random.imagecdn.app/500/500",
      "https://random.imagecdn.app/500/500",
    ],
  },
  {
    name: "Jane Smith",
    walletAddress: "0xabcdef1234567890",
    telegramId: "@janesmith",
    bio: "I am a graphic designer",
    picturesUrl: [
      "https://random.imagecdn.app/500/501",
      "https://random.imagecdn.app/500/502",
      "https://random.imagecdn.app/500/503",
    ],
  },
  {
    name: "Alice Johnson",
    walletAddress: "0x1234abcd5678ef91",
    telegramId: "@alicejohnson",
    bio: "I am a data scientist",
    picturesUrl: [
      "https://random.imagecdn.app/500/504",
      "https://random.imagecdn.app/500/505",
      "https://random.imagecdn.app/500/506",
    ],
  },
  {
    name: "Bob Brown",
    walletAddress: "0xabcdef0987654321",
    telegramId: "@bobbrown",
    bio: "I am a product manager",
    picturesUrl: [
      "https://random.imagecdn.app/500/507",
      "https://random.imagecdn.app/500/508",
      "https://random.imagecdn.app/500/509",
    ],
  },
  {
    name: "Charlie Davis",
    walletAddress: "0x1234567890abcdei",
    telegramId: "@charliedavis",
    bio: "I am a UX designer",
    picturesUrl: [
      "https://random.imagecdn.app/500/510",
      "https://random.imagecdn.app/500/511",
      "https://random.imagecdn.app/500/512",
    ],
  },
  {
    name: "Eve Wilson",
    walletAddress: "0xabcdef1234567892",
    telegramId: "@evewilson",
    bio: "I am a blockchain developer",
    picturesUrl: [
      "https://random.imagecdn.app/500/513",
      "https://random.imagecdn.app/500/514",
      "https://random.imagecdn.app/500/515",
    ],
  },
];

export const getUserCards = async (): Promise<UserInfo[]> => UserCards;

export const getReverseUserCards = async (): Promise<UserInfo[]> => UserCards.slice().reverse();