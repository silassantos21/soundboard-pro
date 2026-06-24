import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { EmojiPicker } from './EmojiPicker';
import type { CreateSoundPadInput } from '../types';

interface AddPadModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (input: CreateSoundPadInput) => Promise<void>;
}

export function AddPadModal({ visible, onClose, onSave }: AddPadModalProps) {
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('🎵');
  const [audioUri, setAudioUri] = useState('');
  const [audioFileName, setAudioFileName] = useState('');
  const [saving, setSaving] = useState(false);

  const pickAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/x-m4a', 'audio/aac'],
      copyToCacheDirectory: false,
    });
    if (!result.canceled && result.assets[0]) {
      setAudioUri(result.assets[0].uri);
      setAudioFileName(result.assets[0].name);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Atenção', 'Digite um nome para o pad.');
      return;
    }
    if (!audioUri) {
      Alert.alert('Atenção', 'Selecione um arquivo de áudio.');
      return;
    }
    setSaving(true);
    try {
      await onSave({ title: title.trim(), emoji, audioUri, audioFileName });
      setTitle('');
      setEmoji('🎵');
      setAudioUri('');
      setAudioFileName('');
    } catch (err: any) {
      Alert.alert('Erro', err?.message ?? 'Não foi possível salvar o pad.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Novo Pad</Text>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Rimshot, Aplauso, Ding..."
            placeholderTextColor="#555"
            maxLength={30}
            autoFocus
          />

          <Text style={styles.label}>Emoji</Text>
          <EmojiPicker selected={emoji} onSelect={setEmoji} />

          <Text style={[styles.label, { marginTop: 8 }]}>Áudio</Text>
          <TouchableOpacity style={styles.audioBtn} onPress={pickAudio} activeOpacity={0.8}>
            <Ionicons name="musical-note" size={22} color="#FFFFFF" />
            <Text style={styles.audioBtnText} numberOfLines={1}>
              {audioFileName || 'Selecionar arquivo de áudio'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.saveBtn, saving && styles.btnDisabled]}
            onPress={handleSave}
            disabled={saving}
            activeOpacity={0.85}
          >
            {saving
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text style={styles.saveBtnText}>Salvar</Text>
            }
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
    backgroundColor: '#1A1A1A',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  body: {
    padding: 20,
    paddingBottom: 48,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888888',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 24,
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    marginBottom: 32,
  },
  audioBtnText: {
    fontSize: 15,
    color: '#CCCCCC',
    flex: 1,
  },
  saveBtn: {
    backgroundColor: '#CC0000',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  btnDisabled: {
    opacity: 0.6,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
