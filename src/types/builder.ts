/**
 * Component type definitions
 */

export type ComponentType = 
  | 'button'
  | 'text'
  | 'heading'
  | 'image'
  | 'input'
  | 'container'
  | 'card'
  | 'navbar'
  | 'footer';

export interface ComponentProps {
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

export interface Component {
  id: string;
  type: ComponentType;
  props: ComponentProps;
  children?: Component[];
}

export interface Page {
  id: string;
  name: string;
  path: string;
  components: Component[];
  metadata?: PageMetadata;
}

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  preview?: string;
  pages: Page[];
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  pages: Page[];
  createdAt: number;
  updatedAt: number;
}
