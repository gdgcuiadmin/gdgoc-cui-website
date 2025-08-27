import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://rdwaplvdjhkpufdwdeht.supabase.co";
const supabaseAnonKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkd2FwbHZkamhrcHVmZHdkZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3MTE1NTIsImV4cCI6MjA2ODI4NzU1Mn0.TXeMgxOsLnhowByTU4kKyOKOb8c89kJQKHxEpz0sYZY";
  
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  max_attendees?: number;
  status: "upcoming" | "completed";
  color: string;
  tags: string[];
  image_url?: string;
  registration_url?: string;
  featured: boolean;
  event_slug?: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  image_url: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  email?: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  alt_text: string;
  event_id?: string | null;
  category: string;
  order_index: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
  event?: Event; // For joined queries
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  icon: string;
  color: string;
  order_index: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed";
  subscribed_at: string;
  unsubscribed_at?: string;
}

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

// Events CRUD
export const getEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });
  return { data, error };
};

export const getFeaturedEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("featured", true)
    .order("date", { ascending: false })
    .limit(5);
  return { data, error };
};

export const getUpcomingEvents = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "upcoming")
    .order("date", { ascending: true });
  return { data, error };
};

export const createEvent = async (
  event: Omit<Event, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("events")
    .insert([event])
    .select()
    .single();
  return { data, error };
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  const { data, error } = await supabase
    .from("events")
    .update({ ...event, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteEvent = async (id: string) => {
  const { error } = await supabase.from("events").delete().eq("id", id);
  return { error };
};

// Team Members CRUD
export const getTeamMembers = async () => {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("active", true)
    .order("order_index", { ascending: true });
  return { data, error };
};

export const getAllTeamMembers = async () => {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("order_index", { ascending: true });
  return { data, error };
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("team_members")
    .insert([member])
    .select()
    .single();
  return { data, error };
};

export const updateTeamMember = async (
  id: string,
  member: Partial<TeamMember>,
) => {
  const { data, error } = await supabase
    .from("team_members")
    .update({ ...member, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteTeamMember = async (id: string) => {
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  return { error };
};

// Gallery CRUD - Simple approach
export const getGalleryImages = async () => {
  const { data, error } = await supabase
    .from("gallery_images")
    .select(
      `
      *,
      event:events(id, title, date)
    `,
    )
    .order("order_index", { ascending: true });
  return { data, error };
};

export const getEventGalleryImages = async (eventId: string) => {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("event_id", eventId)
    .order("order_index", { ascending: true });
  return { data, error };
};

export const createGalleryImage = async (
  image: Omit<GalleryImage, "id" | "created_at" | "updated_at" | "event">,
) => {
  const { data, error } = await supabase
    .from("gallery_images")
    .insert([image])
    .select()
    .single();
  console.log("gallery error", error);
  return { data, error };
};

export const updateGalleryImage = async (
  id: string,
  image: Partial<GalleryImage>,
) => {
  const { data, error } = await supabase
    .from("gallery_images")
    .update({ ...image, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  console.log("update: ", error);
  return { data, error };
};

export const deleteGalleryImage = async (id: string, fileName: string) => {
  const { error } = await supabase.from("gallery_images").delete().eq("id", id);
  // const { error: imageError } = await supabase.storage
  //   .from("gallery")
  //   .remove([`images/${id}`]);
  return { error };
};

// Resources CRUD
export const getResources = async () => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("category", { ascending: true })
    .order("order_index", { ascending: true });
  return { data, error };
};

export const getFeaturedResources = async () => {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("featured", true)
    .order("category", { ascending: true })
    .order("order_index", { ascending: true });
  return { data, error };
};

export const createResource = async (
  resource: Omit<Resource, "id" | "created_at" | "updated_at">,
) => {
  const { data, error } = await supabase
    .from("resources")
    .insert([resource])
    .select()
    .single();
  return { data, error };
};

export const updateResource = async (
  id: string,
  resource: Partial<Resource>,
) => {
  const { data, error } = await supabase
    .from("resources")
    .update({ ...resource, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase.from("resources").delete().eq("id", id);
  return { error };
};

export const uploadFile = async (
  filePrefix: string,
  file: File,
  name: string,
) => {
  const bucket = filePrefix.split("/")[0];
  const folder = filePrefix.split("/")[1];
  const filePath = `${folder}/${name}`;
  const { error } = await supabase.storage.from(bucket).upload(filePath, file, {
    upsert: true,
  });
  console.log(error);

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data.publicUrl;
};

/*
// Contact Submissions CRUD
export const getContactSubmissions = async () => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};

export const createContactSubmission = async (
  submission: Omit<ContactSubmission, "id" | "created_at" | "status">,
) => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert([submission])
    .select()
    .single();
  return { data, error };
};

export const updateContactSubmissionStatus = async (
  id: string,
  status: ContactSubmission["status"],
) => {
  const { data, error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  return { data, error };
};

export const deleteContactSubmission = async (id: string) => {
  const { error } = await supabase
    .from("contact_submissions")
    .delete()
    .eq("id", id);
  return { error };
};

// Newsletter Subscribers CRUD
export const getNewsletterSubscribers = async () => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  return { data, error };
};

export const subscribeToNewsletter = async (email: string, name?: string) => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email, name }])
    .select()
    .single();
  return { data, error };
};

export const unsubscribeFromNewsletter = async (email: string) => {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({
      status: "unsubscribed",
      unsubscribed_at: new Date().toISOString(),
    })
    .eq("email", email)
    .select()
    .single();
  return { data, error };
};

*/
// Statistics functions
export const getWebsiteStats = async () => {
  const [
    eventsResult,
    teamResult,
    galleryResult,
    resourcesResult,
    // contactResult,
    // subscribersResult,
  ] = await Promise.all([
    getEvents(),
    getAllTeamMembers(),
    getGalleryImages(),
    getResources(),
    // getContactSubmissions(),
    // getNewsletterSubscribers(),
  ]);

  const events = eventsResult.data || [];
  const upcomingEvents = events.filter(
    (event) => event.status === "upcoming",
  ).length;
  const completedEvents = events.filter(
    (event) => event.status === "completed",
  ).length;

  return {
    totalEvents: events.length,
    upcomingEvents,
    completedEvents,
    teamMembers: teamResult.data?.length || 0,
    galleryImages: galleryResult.data?.length || 0,
    resources: resourcesResult.data?.length || 0,
    // contactSubmissions: contactResult.data?.length || 0,
    // newsletterSubscribers:
    //   subscribersResult.data?.filter((sub) => sub.status === "active").length ||
    //   0,
  };
};
