'use client';

import { useState } from 'react';
import { Languages, RefreshCw, Camera, BookOpen, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import styles from '../_styles/practice-menu.module.css';

interface MenuItem {
  id: string;
  title: string;
  description: string;
  level: MenuLevel;
  icon: LucideIcon;
  color: MenuColor;
}

type MenuLevel = 'beginner' | 'intermediate' | 'advanced';

interface MenuColor {
  gradient: string;
  levelBadge: string;
}

interface PracticeMenuProps {
  onItemSelect?: (itemId: string) => void;
  selectedItem?: string | null;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'instant-english',
    title: '瞬間英作文',
    description: '日本語を瞬時に英語に翻訳',
    level: 'beginner',
    icon: Languages,
    color: {
      gradient: 'gradientBeginner',
      levelBadge: 'badgeBeginner',
    },
  },
  {
    id: 'paraphrase',
    title: 'パラフレーズ',
    description: '同じ意味を異なる表現で',
    level: 'intermediate',
    icon: RefreshCw,
    color: {
      gradient: 'gradientIntermediate',
      levelBadge: 'badgeIntermediate',
    },
  },
  {
    id: 'instant-description',
    title: '瞬間描写',
    description: '画像を瞬時に英語で描写',
    level: 'advanced',
    icon: Camera,
    color: {
      gradient: 'gradientAdvanced',
      levelBadge: 'badgeAdvanced',
    },
  },
];

const LEVEL_LABELS = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
} as const;

const ANIMATION_DELAY = 150;

export function PracticeMenu({
  onItemSelect,
  selectedItem: controlledSelected,
}: PracticeMenuProps = {}) {
  const [selectedItem, setSelectedItem] = useState<string | null>(controlledSelected ?? null);

  const handleItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    onItemSelect?.(itemId);
  };

  return (
    <div className={styles.container}>
      {/* ヘッダー */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.iconWrapper}>
            <BookOpen className={styles.headerIcon} />
          </div>
          <h1 className={styles.title}>練習メニュー</h1>
        </div>
      </div>

      {/* サブタイトル */}
      <div className={styles.subtitle}>
        <p className={styles.subtitleText}>メニューを選択してください</p>
      </div>

      {/* メニューアイテム */}
      <div className={styles.menuContainer}>
        {/* 携帯・タブレット: 縦並び */}
        <div className={styles.mobileLayout}>
          {MENU_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`${styles.mobileCard} ${selectedItem === item.id ? styles.mobileSelected : ''}`}
                style={{
                  animationDelay: `${index * ANIMATION_DELAY}ms`,
                }}
              >
                {/* アイコン */}
                <div className={`${styles.mobileIcon} ${styles[item.color.gradient]}`}>
                  <IconComponent className={styles.mobileIconSvg} />
                </div>

                {/* コンテンツ */}
                <div className={styles.mobileContent}>
                  {/* レベルバッジ */}
                  <div className={styles.mobileBadgeWrapper}>
                    <span className={`${styles.mobileLevelBadge} ${styles[item.color.levelBadge]}`}>
                      {LEVEL_LABELS[item.level]}
                    </span>
                  </div>
                  <h2 className={styles.mobileTitle}>{item.title}</h2>
                  <p className={styles.mobileDescription}>{item.description}</p>
                </div>

                {/* 矢印アイコン */}
                <div className={styles.mobileArrow}>
                  <ChevronRight className={styles.mobileArrowIcon} />
                </div>
              </div>
            );
          })}
        </div>

        {/* デスクトップ: 横並び */}
        <div className={styles.desktopLayout}>
          {MENU_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`${styles.desktopCard} ${selectedItem === item.id ? styles.desktopSelected : ''}`}
                style={{
                  animationDelay: `${index * ANIMATION_DELAY}ms`,
                }}
              >
                {/* レベルバッジ */}
                <div className={styles.desktopBadgeWrapper}>
                  <span className={`${styles.desktopLevelBadge} ${styles[item.color.levelBadge]}`}>
                    {LEVEL_LABELS[item.level]}
                  </span>
                </div>

                {/* アイコン */}
                <div className={`${styles.desktopIcon} ${styles[item.color.gradient]}`}>
                  <IconComponent className={styles.desktopIconSvg} />
                </div>

                {/* コンテンツ */}
                <div className={styles.desktopContent}>
                  <h2 className={styles.desktopTitle}>{item.title}</h2>
                  <p className={styles.desktopDescription}>{item.description}</p>
                </div>

                {/* 矢印アイコン（下向き） */}
                <div className={styles.desktopArrow}>
                  <svg
                    className={styles.desktopArrowIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
