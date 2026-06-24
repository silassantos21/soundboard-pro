import { StyleSheet, TouchableOpacity, View } from 'react-native';

const COLORS = [
  '#FF4444', '#FF8800', '#FFD700', '#44DD44',
  '#00CCFF', '#4466FF', '#CC44FF', '#FF44CC',
  '#FF6B6B', '#FFA500', '#00E676', '#29B6F6',
  '#AB47BC', '#FFEE58', '#26C6DA', '#EC407A',
];

interface ColorPickerProps {
  selected: string;
  onSelect: (color: string) => void;
}

export function ColorPicker({ selected, onSelect }: ColorPickerProps) {
  return (
    <View style={styles.grid}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[styles.swatch, { backgroundColor: color }, selected === color && styles.selected]}
          onPress={() => onSelect(color)}
          activeOpacity={0.8}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  selected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
});
