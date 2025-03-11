# Görev Yönetim Uygulaması (React + Vite)

Bu proje, kullanıcıların görev ekleyebildiği, düzenleyebildiği ve tamamlayabildiği bir **Görev Yönetim Uygulaması**dır. **React** kullanılarak geliştirilmiş olup, masaüstü ve mobil cihazlara uygun olarak tasarlanmıştır.

## 🚀 Özellikler

### 📌 Temel Özellikler

- **Görev Yönetimi**:

  - Görevler aşağıdaki bilgileri içerir:
    - **Başlık**
    - **Açıklama**
    - **Durum** (Open / In Progress / In Review / Done)
    - **Kullanıcı atanabilir**
  - **Yeni görev ekleyebilir.**
  - **Var olan görevleri düzenleyebilir.**
  - **Görevleri tamamlandı olarak işaretleyebilir.**
  - **Görevleri silebilir.**

- **Lokal Depolama**: Görevler **localStorage** üzerinden saklanmaktadır.

### 🔐 Kimlik Doğrulama ve Yetkilendirme

- **Oturum Açma**:
  - Kullanıcılar, **T.C. Kimlik Numarası (TCKimlik No) doğrulaması** ile giriş yapabilir.
- **Yetkilendirme**:
  - **Kullanıcılar** yalnızca kendilerine ait görevleri düzenleyebilir veya silebilir.
  - **Yöneticiler (admin)** tüm görevleri görüntüleyebilir ve düzenleyebilir.

## 📱 Duyarlı Tasarım

- **Masaüstü ve Mobil uyumluluk**: Cihaz boyutuna göre değişen uygun tasarım.

## 🛠 Kullanılan Teknolojiler

- **React**
- **React Hooks (useState, useEffect)**
- **React Router**
- **Tailwind CSS (veya alternatif bir stil kütüphanesi)**
- **localStorage (veri saklama için)**

## 🚀 Kurulum ve Çalıştırma

1. **Repoyu klonlayın**
   https://github.com/agridagtarik/Rakamon
2. **Bağımlılıkları yükleyin**
   npm install
3. **Projeyi Çalıştırın**
   npm run dev
4. **Tarayıcıdan local olarak erişin**

## Geliştirme Aşamaları

- **Görev ekleme, düzenleme, silme**
- **Kullanıcı yönetimi**
- **Geçerli Kimlik doğrulama (TCKimlik No kontrolü)**
- **Yetkilendirme kuralları (Admin/Kullanıcı)**
- **Duyarlı tasarım desteği**
