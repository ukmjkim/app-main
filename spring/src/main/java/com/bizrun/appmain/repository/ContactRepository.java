package com.bizrun.appmain.repository;

import com.bizrun.appmain.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {
}
