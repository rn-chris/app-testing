export interface Category {
  id: string;
  title?: string;
  fields: Field[];
  fieldIdMarkAsTitle?: string;
}

export interface FieldValues {
  id: string;
  value: Record<string, string>;
}

export interface Field {
  id: string;
  label: string;
  attributeType: AttributeType;
}

export interface AttributeType {
  label: string;
  type: 'text' | 'date' | 'checkbox' | 'number';
}

export const ATTRIBUTE_TYPES: AttributeType[] = [
  {
    label: 'Text',
    type: 'text',
  },

  {
    label: 'Date',
    type: 'date',
  },

  {
    label: 'Checkbox',
    type: 'checkbox',
  },

  {
    label: 'Number',
    type: 'number',
  },
];
