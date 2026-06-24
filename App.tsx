import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { listPads } from './src/services/soundPads';
import type { SoundPad } from './src/types';

export default function App() {
  const [pads, setPads] = useState<SoundPad[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    listPads()
      .then((data) => {
        setPads(data);
        setStatus('ok');
      })
      .catch((err) => {
        setErrorMsg(err?.message ?? 'Erro desconhecido');
        setStatus('error');
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SoundBoard Pro</Text>

      {status === 'loading' && <ActivityIndicator color="#fff" style={styles.indicator} />}

      {status === 'ok' && (
        <Text style={styles.subtitle}>Supabase conectado ✓  ({pads.length} pads)</Text>
      )}

      {status === 'error' && (
        <Text style={styles.error}>Erro: {errorMsg}</Text>
      )}

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CC0000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  indicator: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 12,
    opacity: 0.9,
  },
  error: {
    fontSize: 14,
    color: '#FFCCCC',
    marginTop: 12,
    textAlign: 'center',
  },
});
