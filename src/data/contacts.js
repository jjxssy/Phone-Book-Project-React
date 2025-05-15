/**
 * Mock contacts data for the phone book app
 * Each contact has id, name, phone, email, avatar, and tags
 */
export const contacts = [
  {
    id: 1,
    name: "John Smith",
    phone: "050-1234567",
    email: "john.smith@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    favorite: false,
    tags: ["Family", "Work"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    phone: "052-9876543",
    email: "sarah.j@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    favorite: true,
    tags: ["Friends"]
  },
  {
    id: 3,
    name: "Michael Brown",
    phone: "054-5557777",
    email: "michael.b@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    favorite: false,
    tags: ["Work"]
  },
  {
    id: 4,
    name: "Emma Wilson",
    phone: "058-1112222",
    email: "emma.w@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    favorite: true,
    tags: ["Family", "Friends"]
  },
  {
    id: 5,
    name: "David Lee",
    phone: "053-3334444",
    email: "david.l@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    favorite: false,
    tags: ["Work", "School"]
  },
  {
    id: 6,
    name: "Olivia Martin",
    phone: "050-6667777",
    email: "olivia.m@example.com",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    favorite: false,
    tags: ["Family"]
  },
  {
    id: 7,
    name: "James Taylor",
    phone: "052-8889999",
    email: "james.t@example.com",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
    favorite: true,
    tags: ["Friends", "School"]
  },
  {
    id: 8,
    name: "Sophia Anderson",
    phone: "054-4443333",
    email: "sophia.a@example.com",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
    favorite: false,
    tags: ["Work"]
  },
  {
    id: 9,
    name: "Daniel White",
    phone: "058-2223333",
    email: "daniel.w@example.com",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    favorite: false,
    tags: ["School"]
  },
  {
    id: 10,
    name: "Isabella Clark",
    phone: "053-7778888",
    email: "isabella.c@example.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    favorite: true,
    tags: ["Family", "Friends", "Work"]
  }
];

/**
 * Default contact groups for the phone book app
 */
export const defaultGroups = [
  "Family",
  "Friends",
  "Work",
  "School"
]; 