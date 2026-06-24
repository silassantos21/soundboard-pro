import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SoundPadCard } from '../components/SoundPadCard';
import { FABButton } from '../components/FABButton';
import { AddPadModal } from '../components/AddPadModal';
import { EditPadModal } from '../components/EditPadModal';
import { usePads } from '../hooks/usePads';
import type { SoundPad } from '../types';

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const numColumns = width >= 600 ? 3 : 2;

  const { pads, loading, error, addPad, editPad, removePad, favoritePad, playPad } = usePads();
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState<SoundPad | null>(null);
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? pads.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : pads;

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator color="#FFFFFF" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SoundBoard Pro</Text>
        <Text style={styles.headerSub}>{pads.length} sons</Text>
      </View>

      <View style={styles.searchRow}>
        <Ionicons name="search" size={18} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar por nome..."
          placeholderTextColor="#555"
          returnKeyType="search"
          clearButtonMode="never"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Ionicons name="close-circle" size={18} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={filtered.length === 0 ? styles.emptyContainer : styles.grid}
          renderItem={({ item }) => (
            <SoundPadCard
              pad={item}
              onFavorite={favoritePad}
              onLongPress={setEditTarget}
              onPlay={playPad}
            />
          )}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>
                {query.trim()
                  ? `Nenhum pad com "${query}".`
                  : 'Nenhum som ainda.\nToque em + para adicionar.'}
              </Text>
            </View>
          }
        />
      )}

      <FABButton onPress={() => setShowAdd(true)} />

      <AddPadModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={async (input) => {
          await addPad(input);
          setShowAdd(false);
        }}
      />

      {editTarget && (
        <EditPadModal
          pad={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={async (title, emoji) => {
            await editPad(editTarget.id, title, emoji);
            setEditTarget(null);
          }}
          onDelete={async () => {
            await removePad(editTarget.id, editTarget.audio_path);
            setEditTarget(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC0000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 14,
    color: '#FFAAAA',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    marginHorizontal: 14,
    marginBottom: 8,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    marginRight: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#FFFFFF',
    paddingVertical: 0,
  },
  list: {
    flex: 1,
  },
  grid: {
    paddingHorizontal: 8,
    paddingBottom: 110,
  },
  emptyContainer: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  errorText: {
    color: '#FFCCCC',
    fontSize: 14,
    textAlign: 'center',
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.85,
    lineHeight: 26,
  },
});
