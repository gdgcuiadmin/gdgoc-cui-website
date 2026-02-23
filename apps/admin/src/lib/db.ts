import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./firebase";

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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { data: userCredential, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Events CRUD
export const getEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Event))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return { data: null, error };
  }
};

export const getFeaturedEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Event))
      .filter(event => event.featured)
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
      .slice(0, 5);
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching featured events:", error);
    return { data: null, error };
  }
};

export const getUpcomingEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Event))
      .filter(event => event.status === "upcoming")
      .sort((a, b) => (a.date || "").localeCompare(b.date || ""));
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching upcoming events:", error);
    return { data: null, error };
  }
};

export const createEvent = async (
  event: Omit<Event, "id" | "created_at" | "updated_at">,
) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...event,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id: docRef.id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updateEvent = async (id: string, event: Partial<Event>) => {
  try {
    const docRef = doc(db, "events", id);
    await updateDoc(docRef, {
      ...event,
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteEvent = async (id: string) => {
  try {
    await deleteDoc(doc(db, "events", id));
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Team Members CRUD
export const getTeamMembers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "team_members"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
      .filter(member => member.active)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching team members:", error);
    return { data: null, error };
  }
};

export const getAllTeamMembers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "team_members"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as TeamMember))
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching all team members:", error);
    return { data: null, error };
  }
};

export const createTeamMember = async (
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">,
) => {
  try {
    const docRef = await addDoc(collection(db, "team_members"), {
      ...member,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id: docRef.id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updateTeamMember = async (
  id: string,
  member: Partial<TeamMember>,
) => {
  try {
    const docRef = doc(db, "team_members", id);
    await updateDoc(docRef, {
      ...member,
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteTeamMember = async (id: string) => {
  try {
    await deleteDoc(doc(db, "team_members", id));
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Gallery CRUD - Simple approach
export const getGalleryImages = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "gallery_images"));

    // Manual join for events
    const data = await Promise.all(querySnapshot.docs.map(async (docSnap) => {
      const imageData = docSnap.data();
      let event = null;
      if (imageData.event_id) {
        try {
          const eventSnap = await getDoc(doc(db, "events", imageData.event_id));
          if (eventSnap.exists()) {
            const eventData = eventSnap.data();
            event = { id: eventSnap.id, title: eventData.title, date: eventData.date };
          }
        } catch (e) {
          console.error("Error fetching event for gallery image:", e);
        }
      }
      return { id: docSnap.id, ...imageData, event } as GalleryImage;
    }));

    data.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching gallery images:", error);
    return { data: null, error };
  }
};

export const getEventGalleryImages = async (eventId: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, "gallery_images"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage))
      .filter(img => img.event_id === eventId)
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching event gallery images:", error);
    return { data: null, error };
  }
};

export const createGalleryImage = async (
  image: Omit<GalleryImage, "id" | "created_at" | "updated_at" | "event">,
) => {
  try {
    const docRef = await addDoc(collection(db, "gallery_images"), {
      ...image,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id: docRef.id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updateGalleryImage = async (
  id: string,
  image: Partial<GalleryImage>,
) => {
  try {
    const docRef = doc(db, "gallery_images", id);
    await updateDoc(docRef, {
      ...image,
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteGalleryImage = async (id: string, _fileName?: string) => {
  try {
    await deleteDoc(doc(db, "gallery_images", id));
    // Firebase Storage deletion would go here if needed
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Resources CRUD
export const getResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Resource))
      .sort((a, b) => {
        const catCompare = (a.category || "").localeCompare(b.category || "");
        if (catCompare !== 0) return catCompare;
        return (a.order_index || 0) - (b.order_index || 0);
      });
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching resources:", error);
    return { data: null, error };
  }
};

export const getFeaturedResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "resources"));
    const data = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as Resource))
      .filter(resource => resource.featured)
      .sort((a, b) => {
        const catCompare = (a.category || "").localeCompare(b.category || "");
        if (catCompare !== 0) return catCompare;
        return (a.order_index || 0) - (b.order_index || 0);
      });
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching featured resources:", error);
    return { data: null, error };
  }
};

export const createResource = async (
  resource: Omit<Resource, "id" | "created_at" | "updated_at">,
) => {
  try {
    const docRef = await addDoc(collection(db, "resources"), {
      ...resource,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id: docRef.id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updateResource = async (
  id: string,
  resource: Partial<Resource>,
) => {
  try {
    const docRef = doc(db, "resources", id);
    await updateDoc(docRef, {
      ...resource,
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteResource = async (id: string) => {
  try {
    await deleteDoc(doc(db, "resources", id));
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Firebase Storage uploadFile (commented out — will restore when Blaze plan is available)
// export const uploadFile = async (
//   filePrefix: string,
//   file: File,
//   name: string,
// ) => {
//   const bucket = filePrefix.split("/")[0];
//   const folder = filePrefix.split("/")[1];
//   const filePath = `${bucket}/${folder}/${name}`;
//
//   const storageRef = ref(storage, filePath);
//   await uploadBytes(storageRef, file);
//   const publicUrl = await getDownloadURL(storageRef);
//
//   return publicUrl;
// };

// Cloudinary upload (replaces Firebase Storage)
export const uploadFile = async (
  filePrefix: string,
  file: File,
  name: string,
) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.");
  }

  const folder = filePrefix; // e.g. "images/gallery"

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);
  formData.append("public_id", name.replace(/\.[^/.]+$/, "")); // remove file extension

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};



// Certificate types and CRUD
export interface CertificateAttendee {
  name: string;
  email: string;
}

export interface EventCertificate {
  id: string;
  event_id: string;
  event_title: string;
  template_base64: string;
  attendees: CertificateAttendee[];
  created_at: string;
  updated_at: string;
}

export const uploadRawFile = async (
  filePrefix: string,
  file: File,
  name: string,
) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary configuration missing.");
  }

  // Keep the .pdf extension so Cloudinary serves the file with the correct content type
  const publicId = name.endsWith(".pdf") ? name : `${name}.pdf`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", filePrefix);
  formData.append("public_id", publicId);
  formData.append("access_mode", "public");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();
  return data.secure_url;
};

export const getEventCertificates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "event_certificates"));
    const data = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as EventCertificate)
    );
    return { data, error: null };
  } catch (error: any) {
    console.error("Error fetching certificates:", error);
    return { data: null, error };
  }
};

export const createEventCertificate = async (
  certificate: Omit<EventCertificate, "id" | "created_at" | "updated_at">
) => {
  try {
    const docRef = await addDoc(collection(db, "event_certificates"), {
      ...certificate,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id: docRef.id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const updateEventCertificate = async (
  id: string,
  certificate: Partial<EventCertificate>
) => {
  try {
    const docRef = doc(db, "event_certificates", id);
    await updateDoc(docRef, {
      ...certificate,
      updated_at: serverTimestamp(),
    });
    const docSnap = await getDoc(docRef);
    return { data: { id, ...docSnap.data() }, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

export const deleteEventCertificate = async (id: string) => {
  try {
    await deleteDoc(doc(db, "event_certificates", id));
    return { error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

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

  const events = (eventsResult.data || []) as Event[];
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
