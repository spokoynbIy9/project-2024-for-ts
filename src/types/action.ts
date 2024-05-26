

export type Action = 
| { type: 'SET_CURRENT_PAGE'; payload: number }
| { type: 'SET_SEARCH_TERM'; payload: string }
| { type: 'SET_FILTER'; payload: string }
| { type: 'SET_STARTS_WITH_LETTER'; payload: string }
| { type: 'SET_NOT_STARTS_WITH_LETTER'; payload: string };



