import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { usePreferences } from '../context/PreferencesContext';
import { COLORS } from '../constants';

interface Props {
    stability: number; // 0 to 1
}

export default function SignalStabilityAnimation({ stability }: Props) {
    const { reduceMotion } = usePreferences();
    const glViewRef = React.useRef<GLView>(null);

    const onContextCreate = async (gl: any) => {
        const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(COLORS.background);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;

        // Rings representing stability
        const ringCount = 3;
        const rings: THREE.Mesh[] = [];

        for (let i = 0; i < ringCount; i++) {
            const geometry = new THREE.TorusGeometry(1 + i * 0.5, 0.02, 16, 100);
            const material = new THREE.MeshBasicMaterial({
                color: stability > 0.7 ? COLORS.success : stability > 0.4 ? COLORS.warning : COLORS.primary,
                transparent: true,
                opacity: 0.5 - i * 0.1,
            });
            const ring = new THREE.Mesh(geometry, material);
            scene.add(ring);
            rings.push(ring);
        }

        const animate = () => {
            if (!reduceMotion) {
                requestAnimationFrame(animate);

                rings.forEach((ring, i) => {
                    ring.rotation.x += 0.002 * (i + 1);
                    ring.rotation.y += 0.003 * (i + 1);

                    const scale = 1 + Math.sin(Date.now() * 0.001 + i) * 0.05 * (1 - stability);
                    ring.scale.set(scale, scale, scale);
                });
            }

            renderer.render(scene, camera);
            gl.endFrameEXP();
        };

        animate();
    };

    if (reduceMotion) {
        return (
            <View style={styles.fallbackContainer}>
                <View style={styles.barContainer}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <View
                            key={i}
                            style={[
                                styles.bar,
                                {
                                    height: 10 + i * 10,
                                    backgroundColor: (i / 5) <= stability ? (stability > 0.7 ? COLORS.success : COLORS.warning) : COLORS.border
                                }
                            ]}
                        />
                    ))}
                </View>
                <Text style={styles.fallbackText}>Signal Stability: {Math.round(stability * 100)}%</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <GLView ref={glViewRef} style={styles.glView} onContextCreate={onContextCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    glView: { flex: 1 },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background
    },
    barContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 60, marginBottom: 20 },
    bar: { width: 12, marginHorizontal: 4, borderRadius: 6 },
    fallbackText: { fontSize: 16, color: '#64748b', fontWeight: '500' }
});
