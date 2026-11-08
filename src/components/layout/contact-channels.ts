import type { ComponentType } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import {
  hasAddress,
  hasEmail,
  hasHours,
  hasPhone,
  hasWhatsApp,
  siteConfig,
} from "@/config/site";
import { formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";

/** Any icon component that renders at the size its parent sets. */
export type ContactChannelIcon = ComponentType<{
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}>;

export type ContactChannel = {
  key: "phone" | "email" | "whatsapp" | "address" | "hours";
  label: string;
  value: string;
  icon: ContactChannelIcon;
  href?: string;
  /** Opens in a new tab (WhatsApp web). */
  external?: boolean;
};

/**
 * Direct contact channels are only included when the business has configured
 * them (see has* flags in src/config/site.ts). The footer, mobile menu and
 * other surfaces render from this list, so an empty environment never shows
 * an invented phone number, email address or postal address.
 */
const channels: ContactChannel[] = [];

if (hasPhone) {
  channels.push({
    key: "phone",
    label: "Phone",
    value: siteConfig.contact.phone,
    icon: Phone,
    href: formatPhoneHref(siteConfig.contact.phone),
  });
}

if (hasEmail) {
  channels.push({
    key: "email",
    label: "Email",
    value: siteConfig.contact.email,
    icon: Mail,
    href: `mailto:${siteConfig.contact.email}`,
  });
}

if (hasWhatsApp) {
  channels.push({
    key: "whatsapp",
    label: "WhatsApp",
    value: siteConfig.contact.whatsapp,
    icon: WhatsAppIcon,
    href: formatWhatsAppHref(
      siteConfig.contact.whatsapp,
      "Hello Prime House Removals, I would like to ask about a move.",
    ),
    external: true,
  });
}

if (hasAddress) {
  channels.push({
    key: "address",
    label: "Address",
    value: siteConfig.contact.address,
    icon: MapPin,
  });
}

if (hasHours) {
  channels.push({
    key: "hours",
    label: "Opening hours",
    value: siteConfig.contact.hours,
    icon: Clock,
  });
}

export const contactChannels: readonly ContactChannel[] = channels;

export const hasContactChannels = contactChannels.length > 0;
