# ⚡ Quick Deployment Reference

## 🎯 Quick Links

- **Railway**: https://railway.app
- **Vercel**: https://vercel.com
- **GitHub**: https://github.com

---

## 📝 Environment Variables Checklist

### Railway Backend Variables:
```
SPRING_PROFILES_ACTIVE=production
SPRING_DATASOURCE_URL=jdbc:postgresql://${{Postgres.PGHOST}}:${{Postgres.PGPORT}}/${{Postgres.PGDATABASE}}
SPRING_DATASOURCE_USERNAME=${{Postgres.PGUSER}}
SPRING_DATASOURCE_PASSWORD=${{Postgres.PGPASSWORD}}
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false
SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect
SERVER_PORT=${{PORT}}
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Vercel Frontend Variables:
```
REACT_APP_API_URL=https://your-backend.up.railway.app/api
```

---

## 🔗 URL Format

- **Backend**: `https://your-app-production.up.railway.app`
- **Frontend**: `https://your-app.vercel.app`

---

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway database created
- [ ] Railway backend deployed
- [ ] Backend URL copied
- [ ] Vercel frontend deployed
- [ ] Frontend URL copied
- [ ] CORS updated in Railway
- [ ] Environment variables set correctly
- [ ] Tested full application flow

---

## 🚨 Important Notes

1. **Order Matters**: Deploy backend first, then frontend
2. **CORS**: Must be updated after getting frontend URL
3. **Environment Variables**: Must be set before deployment
4. **Database**: Railway auto-creates connection variables

---

## 📞 Support

- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Check logs in both platforms for detailed errors

