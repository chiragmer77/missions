import { EventEmitter, Injectable } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  taskAddEvent: EventEmitter<number> = new EventEmitter<number>();


  constructor() { }

  /** Add the first later of name  */
  getFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  // Add background color
  getBackgroundColor(name: string): string {
    const firstLetter = name.charAt(0).toUpperCase();
    switch (firstLetter) {
      case 'A':
        return '#FF0000'; // Red
      case 'B':
        return '#0000FF'; // Blue
      case 'C':
        return '#00FF00'; // Green
      case 'D':
        return '#FFA500'; // Orange
      case 'E':
        return '#FFFF00'; // Yellow
      case 'F':
        return '#FFC0CB'; // Pink
      case 'G':
        return '#800080'; // Purple
      case 'H':
        return '#008080'; // Teal
      case 'I':
        return '#00FFFF'; // Cyan
      case 'J':
        return '#800000'; // Maroon
      case 'K':
        return '#008000'; // Dark Green
      case 'L':
        return '#FFD700'; // Gold
      case 'M':
        return '#FF6347'; // Tomato
      case 'N':
        return '#87CEEB'; // Sky Blue
      case 'O':
        return '#FF4500'; // Orange Red
      case 'P':
        return '#DA70D6'; // Orchid
      case 'Q':
        return '#556B2F'; // Dark Olive Green
      case 'R':
        return '#FF69B4'; // Hot Pink
      case 'S':
        return '#800080'; // Purple
      case 'T':
        return '#A52A2A'; // Brown
      case 'U':
        return '#9932CC'; // Dark Orchid
      case 'V':
        return '#000080'; // Navy
      case 'W':
        return '#FF1493'; // Deep Pink
      case 'X':
        return '#4682B4'; // Steel Blue
      case 'Y':
        return '#9ACD32'; // Yellow Green
      case 'Z':
        return '#000000'; // Black
      default:
        return '#808080'; // Default background color if the letter doesn't match any case (Gray)
    }
  }

  // Time ago function
  timeAgo(date: Date | string): string {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  }
}
