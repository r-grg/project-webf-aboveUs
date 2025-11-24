import { IconButton } from 'react-native-paper';

interface FavoriteToggleProps {
  isFavorite: boolean
  onToggle: () => void
  size?: number
}

export const FavoriteToggle = ({ isFavorite, onToggle, size = 24 }: FavoriteToggleProps) => {
  return (
    <IconButton
      icon={isFavorite ? "star" : "star-outline"}
      size={size}
      onPress={onToggle}
      iconColor={isFavorite ? "#FCD34D" : "#9CA3AF"}
    />
  )
}