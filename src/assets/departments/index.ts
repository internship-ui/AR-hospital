import generalMedicine from './general-medicine.png';
import cardiology from './cardiology.jpg';
import orthopaedics from './orthopaedics.jpg';
import paediatrics from './paediatrics.jpg';
import gynaecology from './gynaecology.png';
import dermatology from './dermatology.png';
import ent from './ent.png';
import generalSurgery from './general-surgery.png';
import intensiveCare from './intensive-care.png';
import omfsSurgery from './omfs-surgery.png';
import neurosurgery from './neurosurgery.png';
import physiotherapy from './physiotherapy.png';
import virology from './virology.png';
import pulmonology from './pulmonology.png';

export const DEPARTMENT_IMAGES: Record<string, string> = {
  'general-medicine': generalMedicine,
  'cardiology': cardiology,
  'orthopaedics': orthopaedics,
  'paediatrics': paediatrics,
  'gynaecology': gynaecology,
  'dermatology': dermatology,
  'ent': ent,
  'general-surgery': generalSurgery,
  'intensive-care': intensiveCare,
  'omfs-surgery': omfsSurgery,
  'neurosurgery': neurosurgery,
  'physiotherapy': physiotherapy,
  'virology': virology,
  'pulmonology': pulmonology,
};

export function getDepartmentImage(id: string, fallbackPath?: string): string {
  if (DEPARTMENT_IMAGES[id]) {
    return DEPARTMENT_IMAGES[id];
  }
  if (fallbackPath) {
    const clean = fallbackPath.startsWith('/') ? fallbackPath.slice(1) : fallbackPath;
    return clean.startsWith('./') ? clean : `./${clean}`;
  }
  return '';
}
