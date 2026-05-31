/**
 * HomeScreen — Start or join an Icebreaker AI session
 */
import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useGameStore, ICEBREAKER_CATEGORIES } from '../store/gameStore';
import { colors, spacing, radius, typography } from '../theme';

export default function HomeScreen() {
  const [mode, setMode] = useState('home');
  const [hostName, setHostName] = useState('');
  const [category, setCategory] = useState('fun');
  const [joinCode, setJoinCode] = useState('');
  const [joinName, setJoinName] = useState('');
  const startSession = useGameStore(s => s.startSession);
  const joinSession = useGameStore(s => s.joinSession);

  if (mode === 'host') {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => setMode('home')} style={styles.back}>
              <Text style={styles.backText}>back</Text>
            </TouchableOpacity>
            <Text style={styles.bigEmoji}>🧊</Text>
            <Text style={styles.title}>Host a Session</Text>
            <Text style={styles.sub}>Create a room and share the code with your team</Text>

            <Text style={styles.label}>Your name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Alex"
              placeholderTextColor={colors.textMuted}
              value={hostName}
              onChangeText={setHostName}
              autoFocus
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.catRow}>
              {ICEBREAKER_CATEGORIES.map(c => (
                <TouchableOpacity
                  key={c.id}
                  style={[styles.catPill, category === c.id && styles.catPillActive]}
                  onPress={() => setCategory(c.id)}
                >
                  <Text style={styles.catEmoji}>{c.emoji}</Text>
                  <Text style={[styles.catLabel, category === c.id && styles.catLabelActive]}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.btn, !hostName.trim() && styles.btnDisabled]}
              disabled={!hostName.trim()}
              onPress={() => startSession(hostName.trim(), category)}
            >
              <Text style={styles.btnText}>Create Session</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (mode === 'join') {
    return (
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
          <ScrollView contentContainerStyle={styles.content}>
            <TouchableOpacity onPress={() => setMode('home')} style={styles.back}>
              <Text style={styles.backText}>back</Text>
            </TouchableOpacity>
            <Text style={styles.bigEmoji}>🎯</Text>
            <Text style={styles.title}>Join a Session</Text>
            <Text style={styles.sub}>Enter the room code your host shared</Text>

            <Text style={styles.label}>Room code</Text>
            <TextInput
              style={[styles.input, styles.codeInput]}
              placeholder="e.g. X4KP"
              placeholderTextColor={colors.textMuted}
              value={joinCode}
              onChangeText={t => setJoinCode(t.toUpperCase())}
              maxLength={4}
              autoCapitalize="characters"
              autoFocus
            />

            <Text style={styles.label}>Your name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Jordan"
              placeholderTextColor={colors.textMuted}
              value={joinName}
              onChangeText={setJoinName}
            />

            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary, (!joinCode.trim() || !joinName.trim()) && styles.btnDisabled]}
              disabled={!joinCode.trim() || !joinName.trim()}
              onPress={() => joinSession(joinCode, joinName.trim())}
            >
              <Text style={styles.btnText}>Join Session</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>🧊✨</Text>
          <Text style={styles.heroTitle}>Icebreaker AI</Text>
          <Text style={styles.heroSub}>No awkward silences.{'\n'}AI-powered warmups for your team.</Text>
        </View>

        <View style={styles.features}>
          {[
            { emoji: '🎯', text: 'AI generates fresh prompts every session' },
            { emoji: '📱', text: 'Everyone answers on their phone, no apps to install' },
            { emoji: '🤖', text: 'AI reads back answers with personality' },
            { emoji: '🏆', text: 'Vote for the most relatable answer' },
          ].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Text style={styles.featureEmoji}>{f.emoji}</Text>
              <Text style={styles.featureText}>{f.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.btn} onPress={() => setMode('host')}>
          <Text style={styles.btnText}>Host a Session</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => setMode('join')}>
          <Text style={styles.btnText}>Join with Code</Text>
        </TouchableOpacity>

        <Text style={styles.demoNote}>Demo mode — no account required</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:           { flex: 1, backgroundColor: colors.bg },
  flex:           { flex: 1 },
  content:        { padding: spacing.xl, paddingTop: spacing.xxl, flexGrow: 1 },
  back:           { marginBottom: spacing.xl },
  backText:       { color: colors.primaryLight, fontSize: 16 },
  hero:           { alignItems: 'center', marginBottom: spacing.xxl },
  heroEmoji:      { fontSize: 56, marginBottom: spacing.md },
  heroTitle:      { ...typography.title, color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
  heroSub:        { ...typography.body, color: colors.textSub, textAlign: 'center', lineHeight: 24 },
  features:       { marginBottom: spacing.xxl },
  featureRow:     { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  featureEmoji:   { fontSize: 24, width: 36 },
  featureText:    { ...typography.body, color: colors.textSub, flex: 1 },
  bigEmoji:       { fontSize: 48, textAlign: 'center', marginBottom: spacing.md },
  title:          { ...typography.title, color: colors.text, textAlign: 'center', marginBottom: spacing.sm },
  sub:            { ...typography.body, color: colors.textSub, textAlign: 'center', marginBottom: spacing.xl },
  label:          { fontSize: 11, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.sm },
  input:          {
    backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
    borderRadius: radius.md, padding: spacing.md,
    color: colors.text, fontSize: 16, marginBottom: spacing.lg,
  },
  codeInput:      { fontSize: 28, fontWeight: '700', textAlign: 'center', letterSpacing: 12 },
  catRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.xl },
  catPill:        {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 999,
    paddingVertical: 6, paddingHorizontal: 12, backgroundColor: colors.card,
  },
  catPillActive:  { borderColor: colors.primary, backgroundColor: '#7C3AED22' },
  catEmoji:       { fontSize: 14 },
  catLabel:       { fontSize: 12, color: colors.textMuted },
  catLabelActive: { color: colors.primaryLight },
  btn:            {
    backgroundColor: colors.primary, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center', marginBottom: spacing.md,
  },
  btnSecondary:   { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.primary },
  btnDisabled:    { opacity: 0.4 },
  btnText:        { color: colors.white, fontSize: 17, fontWeight: '700' },
  demoNote:       { textAlign: 'center', color: colors.textMuted, fontSize: 13, marginTop: spacing.md },
});
