'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Content } from '@/components/Content';
import { cn } from '@/lib/tw';
import { POSITIONS } from '@/constants/careers';

interface ApplicationFormSectionProps {
  className?: string;
  selectedPosition?: string;
}

export function ApplicationFormSection({
  className,
  selectedPosition = '',
}: ApplicationFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    residence: '',
    position: '',
    portfolio: '',
    introduction: '',
  });

  useEffect(() => {
    if (selectedPosition) {
      setFormData((prev) => ({ ...prev, position: selectedPosition }));
    }
  }, [selectedPosition]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const positionTitle =
      POSITIONS.find((p) => p.id === formData.position)?.title || formData.position;

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbzeW5C5G0GJ9e7YUjj5wsPzVu_RfYSor3h1OQaq8SRJN2kQ34TxnOVbI2AdcKhQefDt/exec',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            gender: formData.gender,
            residence: formData.residence,
            position: positionTitle,
            portfolio: formData.portfolio || '',
            introduction: formData.introduction,
          }),
        },
      );

      alert('지원이 완료되었습니다! 검토 후 연락드리겠습니다.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        gender: '',
        residence: '',
        position: '',
        portfolio: '',
        introduction: '',
      });
    } catch {
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'w-full px-4 py-3 text-16 border border-border rounded-xl bg-white focus:outline-none focus:border-primary transition-colors';
  const labelClassName = 'text-14 font-medium text-foreground';

  return (
    <section className={cn('w-full flex justify-center bg-surface', className)}>
      <Content className="flex flex-col gap-10 py-16">
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-28 font-bold text-foreground max-md:text-24">지원하기</h2>
          <p className="text-16 text-foreground-muted">
            아래 양식을 작성해 주시면 검토 후 연락드리겠습니다.
          </p>
        </motion.div>

        <motion.form
          className="flex flex-col gap-6 p-8 bg-white rounded-2xl border border-border max-md:p-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClassName}>
                이름 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClassName}>
                연락처 <span className="text-primary">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-1234-5678"
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClassName}>
                이메일 <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="gender" className={labelClassName}>
                성별 <span className="text-primary">*</span>
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="">성별을 선택해주세요</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="residence" className={labelClassName}>
                거주지역 <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="residence"
                name="residence"
                value={formData.residence}
                onChange={handleChange}
                placeholder="예) 서울 강동구"
                required
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="position" className={labelClassName}>
                지원 포지션 <span className="text-primary">*</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className={inputClassName}
              >
                <option value="">포지션을 선택해주세요</option>
                {POSITIONS.map((pos) => (
                  <option key={pos.id} value={pos.id}>
                    {pos.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="portfolio" className={labelClassName}>
              포트폴리오 / 이력서 링크 <span className="text-foreground-muted">(선택)</span>
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              placeholder="https://..."
              className={inputClassName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="introduction" className={labelClassName}>
              자기소개 <span className="text-primary">*</span>
            </label>
            <textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              placeholder="간단한 자기소개와 지원 동기를 작성해주세요."
              required
              rows={5}
              className={cn(inputClassName, 'resize-none')}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 text-16 font-semibold text-white bg-primary rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '제출 중...' : '지원서 제출하기'}
          </button>
        </motion.form>
      </Content>
    </section>
  );
}
